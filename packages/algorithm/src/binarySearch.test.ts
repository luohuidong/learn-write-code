import binarySearch from "./binarySearch";

test("二分搜索：binarySearch([1, 2, 3, 4, 5, 6], 3.5)", () => {
  expect(binarySearch([1, 2, 3, 4, 5, 6], 3.5)).toBe(false);
});

test("二分搜索：binarySearch([5, 8, 10], 10)", () => {
  expect(binarySearch([5, 8, 10], 10)).toBe(true);
});
