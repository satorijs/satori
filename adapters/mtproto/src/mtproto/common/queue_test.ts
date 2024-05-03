// deno-lint-ignore-file require-await
import { assertEquals, assertIsError, unreachable } from "@std/assert";
import TaskQueue from "./queue";

function wait(msec: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, msec));
}

Deno.test(async function basic() {
  const queue = new TaskQueue<() => Promise<void>>((f) => f());
  let state = 0;
  await wait(0);
  queue.enqueue(async () => assertEquals(state, 1));
  await wait(0);
  state = 1;
  queue.unblock();
  await queue.wait;
});

Deno.test(async function multi() {
  const queue = new TaskQueue<() => Promise<void>>((f) => f());
  let state = 0;
  await wait(0);
  queue.enqueue(async () => assertEquals(state, 1));
  queue.enqueue(async () => assertEquals(state, 1));
  queue.enqueue(async () => assertEquals(state, 1));
  await wait(0);
  state = 1;
  queue.unblock();
  await queue.wait;
});

Deno.test(async function change() {
  const queue = new TaskQueue<() => Promise<void>>((f) => f());
  let state = 0;
  await wait(0);
  queue.enqueue(async () => assertEquals(state, 1));
  queue.enqueue(async () => assertEquals(state, 1));
  queue.enqueue(async () => assertEquals(state, 1));
  await wait(0);
  state = 1;
  queue.unblock();
  await wait(0);
  queue.enqueue(async () => {
    state = 2;
  });
  await wait(0);
  queue.enqueue(async () => assertEquals(state, 2));
  await wait(0);
  await queue.wait;
  assertEquals(state, 2);
});

Deno.test(async function block() {
  const queue = new TaskQueue<() => Promise<void>>((f) => f());
  await wait(0);
  queue.unblock();
  await wait(0);
  queue.enqueue(() => wait(10));
  await wait(0);
  queue.enqueue(async () => unreachable()).catch((e) =>
    assertIsError(e, Error, "stop queue")
  );
  queue.stop();
  await queue.wait;
});
