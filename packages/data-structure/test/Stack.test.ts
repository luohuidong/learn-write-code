import Stack from "../src/Stack/ArrayStack";

let stack: Stack<number>;

beforeEach(() => {
  stack = new Stack<number>();
  for (let i = 0; i < 2; i++) {
    stack.push(i + 1);
  }
});

test("添加元素", () => {
  expect(stack.toString()).toBe("1,2");
});

test("取出非空栈元素", () => {
  expect(stack.pop()).toBe(2);
  expect(stack.pop()).toBe(1);
});

test("取出空栈元素", () => {
  const stack = new Stack<number>();
  expect(stack.pop()).toBeUndefined();
});

test("查看非空栈顶", () => {
  expect(stack.peek()).toBe(2);
});

test("查看空栈栈顶", () => {
  const stack = new Stack<number>();
  expect(stack.peek()).toBeUndefined();
});

test("查看非空链表是否不为空", () => {
  expect(stack.isEmpty()).toBeFalsy();
});

test("查看空栈是否为空", () => {
  const stack = new Stack<number>();
  expect(stack.isEmpty()).toBeTruthy();
});

test("查看非空栈元素个数", () => {
  expect(stack.getSize()).toBe(2);
});

test("查看空栈元素个数", () => {
  const stack = new Stack<number>();
  expect(stack.getSize()).toBe(0);
});

test("清空栈元素", () => {
  stack.clear();
  expect(stack.getSize()).toBe(0);
});
