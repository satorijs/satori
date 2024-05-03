import mtproto from "./mtproto.json" assert { type: "json" };
import api from "./api.json" assert { type: "json" };

export type Definition = typeof mtproto;
export type Constructor = Definition["constructors"][number];
export type Param = Constructor["params"][number];
export type Method = Definition["methods"][number];

export { api, mtproto };
