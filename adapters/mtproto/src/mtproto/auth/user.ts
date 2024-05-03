/**
 * Interfaces and functions for user interaction during login.
 *
 * @module auth/user
 * @packageDocumentation
 */

import parse_error from "../common/errparse";
import { tou8 } from "../common/utils";
import srp from "../crypto/srp";
import type { auth } from "../gen/api.js";
import type MTProto from "../mod";
import type RPC from "../rpc/mod";
import { RPCError } from "../rpc/mod";

/**
 * Interface for objects that handle user interaction during login.
 *
 * @remarks
 * The methods of this interface are used by {@link MTProto.login} to prompt
 * the user for information during the login process.
 *
 * @see {@link MTProto.login}
 */
export interface SendCodeUI {
  askCode(): Promise<string>;
  askPassword(hint?: string): Promise<string>;
  askSignUp(): Promise<{ first_name: string; last_name: string } | undefined>;
}

async function login2fa(
  rpc: RPC,
  ui: SendCodeUI,
): Promise<auth.Authorization<keyof auth._Authorization>> {
  const passinfo = await rpc.api.account.getPassword();
  if (
    !passinfo.current_algo ||
    passinfo.current_algo._ == "passwordKdfAlgoUnknown"
  ) {
    throw new Error("unknown alg");
  }
  if (!passinfo.srp_B || !passinfo.srp_id) throw new Error("no srp params");
  const password = await ui.askPassword(passinfo.hint);
  const srpres = await srp(passinfo.current_algo, {
    gb: passinfo.srp_B,
    password,
  });
  return await rpc.api.auth.checkPassword({
    password: {
      _: "inputCheckPasswordSRP",
      srp_id: passinfo.srp_id!,
      ...srpres,
    },
  });
}

/**
 * Prompts the user for login code and performs login via {@link MTProto.rpc}
 *
 * @remarks
 * This is a convenience function for implementing user authentication flow.
 * It prompts the user for a phone number and sends a login code to it,
 * then it asks the user for the code and performs SRP authentication.
 *
 * If the user account has 2FA enabled, it asks the user for the password
 * and sends SRP proof to the server using {@link auth.checkPassword}.
 *
 * If the user account does not have 2FA enabled, it simply logs in without
 * asking for SRP proof.
 *
 * @see {@link MTProto.login} for more information on the login process.
 * @see {@link auth.Authorization} for information about the authorization
 *      object returned by this function.
 *
 * @param proto - {@link MTProto} instance to use for login.
 * @param ui - Interface with methods for user interaction.
 * @param phone_number - The phone number to send the code to.
 * @param logout_tokens - Optional list of logout tokens to invalidate.
 *
 * @returns An authorization object as returned by the server.
 */
export async function sendCode(
  proto: MTProto,
  ui: SendCodeUI,
  phone_number: string,
  logout_tokens: BufferSource[] = [],
): Promise<auth.Authorization<keyof auth._Authorization>> {
  while (true) {
    const rpc = await proto.rpc();
    let sent;
    try {
      sent = await rpc.api.auth.sendCode({
        phone_number,
        settings: {
          _: "codeSettings",
          logout_tokens: logout_tokens.map(tou8),
        },
      });
    } catch (e) {
      if (e instanceof RPCError) {
        let mig_dc;
        if (e.message == "SESSION_PASSWORD_NEEDED") {
          return await login2fa(rpc, ui);
        } else if (
          (mig_dc = parse_error("PHONE_MIGRATE_", e.message)) != null
        ) {
          proto.default_dc = mig_dc;
          continue;
        } else if (e.message == "AUTH_RESTART") {
          continue;
        } else {
          throw new Error("unknown error code", { cause: e });
        }
      }
      throw e;
    }
    if (sent._ === "auth.sentCodeSuccess") {
      if (sent.authorization._ === "auth.authorizationSignUpRequired") {
        throw new Error("need sign up");
      } else {
        return sent.authorization;
      }
    } else {
      const phone_code_hash = sent.phone_code_hash;
      try {
        const phone_code = await ui.askCode();
        let sign;
        try {
          sign = await rpc.api.auth.signIn({
            phone_number,
            phone_code_hash,
            phone_code,
          });
        } catch (e) {
          if (e instanceof RPCError) {
            if (e.message == "SESSION_PASSWORD_NEEDED") {
              return await login2fa(rpc, ui);
            } else if (e.message == "PHONE_CODE_EXPIRED") {
              continue;
            } else {
              throw new Error("unknown error code", { cause: e });
            }
          }
          throw e;
        }
        if (sign._ == "auth.authorizationSignUpRequired") {
          const signupinfo = await ui.askSignUp();
          if (!signupinfo) throw new Error("need sign up");
          const signup = await rpc.api.auth.signUp({
            phone_number,
            phone_code_hash,
            ...signupinfo,
          });
          if (signup._ != "auth.authorization") {
            throw new Error("failed to signup");
          }
          return signup;
        }
        return sign;
      } catch (e) {
        await rpc.api.auth.cancelCode({ phone_number, phone_code_hash });
        throw e;
      }
    }
  }
}
