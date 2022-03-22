import BSTMap from "../src/Map/BSTMap";

let map: BSTMap<number, number>;

beforeEach(() => {
  map = new BSTMap<number, number>();
  map.set(1, 111);
  map.set(2, 123);
});

test("添加节点", () => {
  map.set(3, 323);
  expect(map.get(1)).toBe(111);
  expect(map.get(2)).toBe(123);
  expect(map.get(3)).toBe(323);
  expect(map.getSize()).toBe(3);
});

test("删除节点", () => {
  map.remove(1);
  expect(map.getSize()).toBe(1);
  expect(map.get(1)).toBeNull();
});
