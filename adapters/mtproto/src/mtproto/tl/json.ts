import { api } from "../gen/api.js";

export function decodeTLJson(obj: api.JSONValue): unknown {
  switch (obj._) {
    case "jsonNull":
      return null;
    case "jsonNumber":
    case "jsonString":
    case "jsonBool":
      return obj.value;
    case "jsonArray":
      return obj.value.map(decodeTLJson);
    case "jsonObject":
      return Object.fromEntries(
        obj.value.map(({ key, value }) => [key, decodeTLJson(value)]),
      );
  }
}

export function encodeTLJson(value: any): api.JSONValue {
  switch (typeof value) {
    case "bigint":
      throw new Error("cannot encode bigint");
    case "symbol":
      throw new Error("cannot encode symbol");
    case "function":
      throw new Error("cannot encode function");
    case "boolean":
      return api.jsonBool({ value });
    case "number":
      return api.jsonNumber({ value });
    case "string":
      return api.jsonString({ value });
    case "undefined":
      return api.jsonNull();
    case "object":
      if (value == null) return api.jsonNull();
      else if (Array.isArray(value)) {
        return api.jsonArray({ value: value.map(encodeTLJson) });
      } else {
        return api.jsonObject({
          value: Object.entries(value).map(([key, value]) =>
            api.jsonObjectValue({ key, value: encodeTLJson(value) })
          ),
        });
      }
  }
}
