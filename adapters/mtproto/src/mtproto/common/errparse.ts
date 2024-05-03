export default function parse_error(
  prefix: string,
  text: string,
): number | null {
  if (text.startsWith(prefix)) return +text.slice(prefix.length);
  return null;
}
