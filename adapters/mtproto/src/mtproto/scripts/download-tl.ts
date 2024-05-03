const log = (tag: string, color: string) =>
  (template: TemplateStringsArray, ...objs: any) =>
    console.log(
      "[%c%s%c] %s",
      `color: ${color}; font-weight: bold`,
      tag,
      "",
      String.raw(template, ...objs),
    );

async function download_to_file(url: string, target: string) {
  log("DOWNLOAD", "yellow")`${url} -> ${target}`;
  const file = await Deno.open(target, { create: true, write: true });
  const resp = await fetch(url);
  await resp.body!.pipeTo(file.writable);
  log("DOWNLOAD", "green")`saved to ${target}`;
}

await download_to_file("https://github.com/telegramdesktop/tdesktop/raw/dev/Telegram/SourceFiles/mtproto/scheme/api.tl", "gen/api.tl");
