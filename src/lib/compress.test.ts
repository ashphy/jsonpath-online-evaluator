import { test, expect } from "vitest";
import { compress, decompress } from "./compress";

test("compress and decompress round-trip", async () => {
  const testObject = { foo: "bar", count: 42, nested: { a: 1, b: [1, 2, 3] } };
  const compressed = await compress(testObject);
  const decompressed = await decompress(compressed);
  expect(decompressed).toEqual(testObject);
});

test("compress and decompress null", async () => {
  const compressed = await compress(null);
  const decompressed = await decompress(compressed);
  expect(decompressed).toEqual(null);
});

test("compress and decompress empty object", async () => {
  const compressed = await compress({});
  const decompressed = await decompress(compressed);
  expect(decompressed).toEqual({});
});

test("decompress with invalid string should throw error", async () => {
  await expect(async () => {
    await decompress("not-a-valid-encoded-string");
  }).rejects.toThrow();
});
