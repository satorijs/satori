// @deno-types="../vendor/fflate.d"
import { gunzipSync } from "../vendor/fflate.js";

import { tou8 } from "../common/utils";
import type { AnyObject } from "../gen/api.js";
import { deserialize } from "../tl/deserializer";

export function decompress(buffer: BufferSource) {
  return gunzipSync(tou8(buffer));
}

export function decompressObject<T extends AnyObject = AnyObject>(
  obj: AnyObject,
): T {
  if (obj._ == "mt.gzip_packed") {
    return deserialize<T>(decompress(obj.packed_data));
  }
  return obj as any;
}
