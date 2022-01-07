import { Enum } from "../enum.js";
import uuid from "uuid";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => "mock-uuid"),
  };
});

test("creates a `color` enum", () => {
  let colors = new Enum(["red", "green", "blue"]);
  expect(colors.red).toBe("mock-uuid");
});

test("creates a `numbers` enum and freezes it", () => {
  let numbers = new Enum(["one", "two", "three"]).freeze();
  expect(() => (numbers.one = 1)).toThrow(TypeError);
});

test("checks if a field exists on `numbers` enum", () => {
  let numbers = new Enum(["one", "two", "three"]);
  expect(numbers.exists("one")).toBeTruthy();
});

test("appends a field on existing `names` enum", () => {
  let names = new Enum(["John", "Mary"]);
  names.append("George");
  expect(names.exists("George")).toBeTruthy();
});

test("deletes a field on `name` enum", () => {
  let names = new Enum(["John", "Mary"]);
  names.delete("John");
  expect(names.exists("John")).not.toBeTruthy();
});
