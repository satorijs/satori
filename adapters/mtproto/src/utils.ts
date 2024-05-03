import { api } from "./mtproto/gen/api";

export const decodeUser = (user: api.User) => {
  if (user._ === "userEmpty") return {
    id: user.id.toString(),
    name: null,
    nick: null,
    isBot: false,
  };

  return {
    id: user.id.toString(),
    name: user.first_name + (user.last_name ? " " + user.last_name : ""),
    nick: user.username,
    isBot: user.bot,
  }
}

export const encodeDataUrl = ({
  data,
  mime,
}: {
  data: Uint8Array,
  mime: string,
}) => {
  return `data:${mime};base64,${btoa(String.fromCharCode(...data))}`
}
