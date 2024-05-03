/**
 * Data center mapping.
 *
 * @module
 */

const idmap = {
  1: "pluto",
  2: "venus",
  3: "aurora",
  4: "vesta",
  5: "flora",
} as Record<number, string>;

/**
 * Options for getting address of data center.
 */
export type AddressOption = {
  /**
   * Use websocket connection instead of plain tcp.
   */
  websocket?: boolean;
  /**
   * Use tls connection instead of plain tcp.
   */
  tls?: boolean;
  /**
   * Use CORS for http based connection.
   */
  cors?: boolean;
  /**
   * Use test data center instead of production.
   */
  test?: boolean;
};

/**
 * Get address of data center.
 * @param dc Data center ID.
 * @param options Options for getting address.
 */
export function get_address(dc: number, {
  websocket,
  tls,
  cors,
  test,
}: AddressOption): string {
  let address;
  if (websocket) {
    address = tls ? "wss://" : "ws://";
  } else {
    address = tls ? "https://" : "http://";
  }
  address += idmap[dc] + ".web.telegram.org/api";
  if (cors) address += "w";
  if (websocket) address += "s";
  if (test) address += "_test";
  return address;
}
