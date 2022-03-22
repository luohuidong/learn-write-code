import MinHeap from "../src/Heap/MinHeap";

test("size", () => {
  const heap = new MinHeap();
  heap.insert(4);
  heap.insert(5);
  heap.insert(6);
  heap.insert(1);

  expect(heap.size).toBe(4);
});

test("extractMinimun", () => {
  const heap = new MinHeap();
  heap.insert(2);
  expect(heap.extractMinimun()).toBe(2);
  expect(heap.size).toBe(0);
});

test("extractMinimun empty heap", () => {
  const heap = new MinHeap();
  expect(heap.extractMinimun()).toBeNull();
  expect(heap.size).toBe(0);
});

test("findMinimun", () => {
  const heap = new MinHeap();
  heap.insert(2);
  expect(heap.findMinimun()).toBe(2);
  expect(heap.size).toBe(1);
});

test("findMinimun empty heap", () => {
  const heap = new MinHeap();
  expect(heap.findMinimun()).toBeNull();
});

test("isEmpty", () => {
  const heap = new MinHeap();
  heap.insert(1);
  expect(heap.isEmpty()).toBeFalsy();
});

test("isEmpty empty heap", () => {
  const heap = new MinHeap();
  expect(heap.isEmpty()).toBeTruthy();
});
