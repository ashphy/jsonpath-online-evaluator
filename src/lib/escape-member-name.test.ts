import { expect, test } from "vitest";
import { escapeMemberName } from "./escape-member-name";

test("member name containing only alphabets should not be escaped", () => {
  expect(escapeMemberName("abc")).toBe("abc");
});

test("member name containing only numbers should not be escaped", () => {
  expect(escapeMemberName("123")).toBe("123");
});

test("single quote should be escaped", () => {
  expect(escapeMemberName("a'b")).toBe("a\\'b");
});

test("single quote should be escaped", () => {
  expect(escapeMemberName("a'b")).toBe("a\\'b");
});

test("double quote should not be escaped", () => {
  expect(escapeMemberName('a"b')).toBe('a"b');
});

test("commonly used control characters should be escaped", () => {
  expect(escapeMemberName("a\b\f\n\r\tb")).toBe("a\\b\\f\\n\\r\\tb");
});

test("backslash should be escaped", () => {
  expect(escapeMemberName("a\\b")).toBe("a\\\\b");
});

test("control characters should be escaped", () => {
  expect(escapeMemberName("a\u0000b")).toBe("a\\u0000b");
  expect(escapeMemberName("a\u000bb")).toBe("a\\u000bb");
  expect(escapeMemberName("a\u001fb")).toBe("a\\u001fb");
});

test("backslash should be escaped", () => {
  expect(escapeMemberName("a\\b")).toBe("a\\\\b");
});

test("surrogate pair charctors should not be escaped", () => {
  expect(escapeMemberName("a🤔b")).toBe("a🤔b");
});
