/// copied from koishi-plugin-adapter-qq-crack

import { Dict, h } from 'koishi';
import * as QQ from './types';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function extractText(children: readonly h[]) {
  let content = '';
  for (const child of children) {
    if (child.type === 'text') {
      content += typeof child.attrs.content === 'string' ? child.attrs.content : '';
    } else if (child.type === 'br') {
      content += '\n';
    } else {
      content += extractText(child.children);
    }
  }
  return content;
}

function createPayload(ark: QQ.Message.Ark): QQ.Message.Ark {
  return ark
}

function parseArkObjectKv(value: unknown): QQ.Message.ArkObjKv | undefined {
  if (!isRecord(value) || !isString(value.key) || !isString(value.value)) {
    return;
  }
  return {
    key: value.key,
    value: value.value,
  };
}

function parseArkObjectList(value: unknown) {
  if (!Array.isArray(value)) {
    return;
  }
  const result: QQ.Message.ArkObj[] = [];
  for (const item of value) {
    if (!isRecord(item) || !Array.isArray(item.obj_kv)) {
      return;
    }
    const obj_kv: QQ.Message.ArkObjKv[] = [];
    for (const entry of item.obj_kv) {
      const parsed = parseArkObjectKv(entry);
      if (!parsed) return;
      obj_kv.push(parsed);
    }
    result.push({ obj_kv });
  }
  return result;
}

function parseArkKv(value: unknown): QQ.Message.ArkKv | undefined {
  if (!isRecord(value) || !isString(value.key)) {
    return;
  }
  if (isString(value.value)) {
    return {
      key: value.key,
      value: value.value,
    };
  }
  const obj = parseArkObjectList(value.obj);
  if (!obj) {
    return;
  }
  return {
    key: value.key,
    obj,
  };
}

function parseArkKvList(value: unknown) {
  if (!Array.isArray(value)) {
    return;
  }
  const result: QQ.Message.ArkKv[] = [];
  for (const item of value) {
    const parsed = parseArkKv(item);
    if (!parsed) return;
    result.push(parsed);
  }
  return result;
}

function parseArk(value: unknown) {
  if (!isRecord(value) || typeof value.template_id !== 'number') {
    return;
  }
  const kv = parseArkKvList(value.kv);
  if (!kv) {
    return;
  }
  return {
    template_id: value.template_id,
    kv,
  } satisfies QQ.Message.Ark;
}

function parseTextField(source: UnknownRecord, key: string) {
  const value = source[key];
  return isString(value) ? value : undefined;
}

function parseArk24(attrs: Dict, children: readonly h[]) {
  const source = (isRecord(attrs.content) ? attrs.content : attrs) as UnknownRecord;
  const desc = parseTextField(source, 'desc');
  const prompt = parseTextField(source, 'prompt');
  const title = parseTextField(source, 'title');
  const metaDesc = parseTextField(source, 'metaDesc') ?? parseTextField(source, 'metadesc');
  const img = parseTextField(source, 'img');
  const link = parseTextField(source, 'link');
  const subTitle = parseTextField(source, 'subTitle') ?? parseTextField(source, 'subtitle');
  if (!desc || !prompt || !title || !metaDesc || !img || !link || !subTitle) {
    return;
  }
  return createPayload({
    template_id: 24,
    kv: [
      { key: '#DESC#', value: desc },
      { key: '#PROMPT#', value: prompt },
      { key: '#TITLE#', value: title },
      { key: '#METADESC#', value: metaDesc },
      { key: '#IMG#', value: img },
      { key: '#LINK#', value: link },
      { key: '#SUBTITLE#', value: subTitle },
    ],
  });
}

function parseArk37(attrs: Dict, children: readonly h[]) {
  const source = (isRecord(attrs.content) ? attrs.content : attrs) as UnknownRecord;
  const prompt = parseTextField(source, 'prompt');
  const title = parseTextField(source, 'metaTitle') ?? parseTextField(source, 'metatitle') ?? parseTextField(source, 'title');
  const subTitle = parseTextField(source, 'metaSubTitle') ?? parseTextField(source, 'metasubtitle') ?? parseTextField(source, 'subtitle');
  const cover = parseTextField(source, 'metaCover') ?? parseTextField(source, 'metacover') ?? parseTextField(source, 'cover');
  const url = parseTextField(source, 'metaUrl') ?? parseTextField(source, 'metaurl') ?? parseTextField(source, 'url') ?? extractText(children).trim();
  if (!prompt || !title || !subTitle || !cover || !url) {
    return;
  }
  return createPayload({
    template_id: 37,
    kv: [
      { key: '#PROMPT#', value: prompt },
      { key: '#METATITLE#', value: title },
      { key: '#METASUBTITLE#', value: subTitle },
      { key: '#METACOVER#', value: cover },
      { key: '#METAURL#', value: url },
    ],
  });
}

function parseArk23List(value: unknown) {
  if (!Array.isArray(value)) {
    return;
  }
  const result: QQ.Message.ArkObj[] = [];
  for (const item of value) {
    if (!isRecord(item)) {
      return;
    }
    const desc = parseTextField(item, 'desc');
    if (!desc) {
      return;
    }
    const obj_kv: QQ.Message.ArkObjKv[] = [{ key: 'desc', value: desc }];
    const link = parseTextField(item, 'link');
    if (link) {
      obj_kv.push({ key: 'link', value: link });
    }
    result.push({ obj_kv });
  }
  return result;
}

function parseArk23(attrs: Dict, children: readonly h[]) {
  const source = (isRecord(attrs.content) ? attrs.content : attrs) as UnknownRecord;
  const desc = parseTextField(source, 'desc');
  const prompt = parseTextField(source, 'prompt');
  const listSource = source.list;
  const list = parseArk23List(listSource);
  if (!desc || !prompt || !list) {
    return;
  }
  return createPayload({
    template_id: 23,
    kv: [
      { key: '#DESC#', value: desc },
      { key: '#PROMPT#', value: prompt },
      { key: '#LIST#', obj: list },
    ],
  });
}

function parseGenericArk(attrs: Dict) {
  const source = isRecord(attrs.content) ? attrs.content : attrs.ark;
  const ark = parseArk(source);
  if (!ark) {
    return;
  }
  return createPayload(ark);
}

export function parseQQArkElement(element: h) {
  const { type, attrs, children } = element;
  if (type === 'qq:ark23')
    return parseArk23(attrs, children);
  if (type === 'qq:ark24')
    return parseArk24(attrs, children);
  if (type === 'qq:ark37')
    return parseArk37(attrs, children);
  if (type === 'qq:ark')
    return parseGenericArk(attrs);
}
