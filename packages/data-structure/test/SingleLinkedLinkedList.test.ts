import { SinglyLinkedList } from "../src/index";

let linkedList: SinglyLinkedList<number>;

beforeEach(() => {
  linkedList = new SinglyLinkedList<number>();
  for (let i = 5; i > 0; i--) {
    linkedList.addFirst(i);
  }
});

test("从头部插入节点 addFirst", () => {
  linkedList.addFirst(6);
  expect(linkedList.toString()).toBe("6,1,2,3,4,5");
  expect(linkedList.size).toBe(6);
  expect(linkedList.head.element).toBe(6);
  expect(linkedList.tail.element).toBe(5);
});

test("从尾部插入节点 addLast", () => {
  linkedList.addLast(1);
  expect(linkedList.toString()).toBe("1,2,3,4,5,1");
  expect(linkedList.size).toBe(6);
  expect(linkedList.head.element).toBe(1);
  expect(linkedList.tail.element).toBe(1);
});

test("从中间插入节点 add", () => {
  linkedList.add(2, 9);
  expect(linkedList.toString()).toBe("1,2,9,3,4,5");

  linkedList.add(4, 10);
  expect(linkedList.toString()).toBe("1,2,9,3,10,4,5");

  expect(linkedList.size).toBe(7);
});

test("插入索引值超过链表节点个数的报错情况 add error", () => {
  expect(() => {
    linkedList.add(6, 2);
  }).toThrow("Add failed. Illegal index");
});

test("插入索引值小于0的报错情况 add error", () => {
  const linkedList = new SinglyLinkedList<number>();
  expect(() => {
    linkedList.add(-1, 2);
  }).toThrow("Add failed. Illegal index");
});

test("获取链表头部节点 getFirst", () => {
  expect(linkedList.getFirst()).toBe(1);

  linkedList.addFirst(10);
  expect(linkedList.getFirst()).toBe(10);
  expect(linkedList.toString()).toBe("10,1,2,3,4,5");

  linkedList.add(0, 2);
  expect(linkedList.getFirst()).toBe(2);
  expect(linkedList.toString()).toBe("2,10,1,2,3,4,5");
});

test("获取空链表第一个节点 getFirst error", () => {
  const linkedList = new SinglyLinkedList();

  expect(() => {
    linkedList.getFirst();
  }).toThrow("LinkedList is empty");
});

test("获取链表尾部节点 getLast", () => {
  expect(linkedList.getLast()).toBe(5);

  linkedList.addLast(10);
  expect(linkedList.getLast()).toBe(10);
  expect(linkedList.toString()).toBe("1,2,3,4,5,10");

  linkedList.add(linkedList.size, 2);
  expect(linkedList.getLast()).toBe(2);
  expect(linkedList.toString()).toBe("1,2,3,4,5,10,2");
});

test("获取空链表最后一个节点 getLast error", () => {
  const linkedList = new SinglyLinkedList();

  expect(() => {
    linkedList.getLast();
  }).toThrowError("LinkedList is empty");
});

test("获取链表中间的节点 get", () => {
  expect(linkedList.get(1)).toBe(2);
});

test("获取超出边界的值 get error", () => {
  expect(() => {
    linkedList.get(6);
  }).toThrowError("Illegal index");
});

test("获取负数索引节点", () => {
  expect(() => {
    linkedList.get(-1);
  }).toThrow("Illegal index");
});

test("设置链表节点 set", () => {
  linkedList.set(1, 4);
  expect(linkedList.get(1)).toBe(4);
});

test("设置超出范围的节点 set Error", () => {
  expect(() => {
    linkedList.set(5, 50);
  }).toThrowError("Illegal index.");
});

test("查找节点 contains", () => {
  expect(linkedList.contains(3)).toBeTruthy();
});

test("查找不存在的节点 contains error", () => {
  expect(linkedList.contains(10)).toBeFalsy();
});

test("删除中间节点 remove", () => {
  expect(linkedList.remove(3)).toBe(4);
  expect(linkedList.toString()).toBe("1,2,3,5");
  expect(linkedList.remove(2)).toBe(3);
  expect(linkedList.toString()).toBe("1,2,5");
  expect(linkedList.size).toBe(3);
});

test("删除越界节点 remove error", () => {
  expect(() => {
    linkedList.remove(5);
  }).toThrow();
});

test("删除链表头节点 removeFirst", () => {
  const linkedList = new SinglyLinkedList();
  linkedList.addFirst(1);
  expect(linkedList.size).toBe(1);
  expect(linkedList.toString()).toBe("1");
  expect(linkedList.head.element).toBe(1);
  expect(linkedList.tail.element).toBe(1);

  // 删除只有一个元素的头节点
  linkedList.removeFirst();
  expect(linkedList.size).toBe(0);
  expect(linkedList.toString()).toBe("");
  expect(linkedList.head).toBeNull();
  expect(linkedList.tail).toBeNull();

  linkedList.addFirst(1);
  linkedList.addFirst(2);
  expect(linkedList.toString()).toBe("2,1");
  expect(linkedList.head.element).toBe(2);
  expect(linkedList.tail.element).toBe(1);

  linkedList.removeFirst();
  expect(linkedList.toString()).toBe("1");
  expect(linkedList.head.element).toBe(1);
  expect(linkedList.tail.element).toBe(1);
});

test("删除空链表的头节点 removeFirst error", () => {
  const linkedList = new SinglyLinkedList();
  expect(() => {
    linkedList.removeFirst();
  }).toThrowError("LinkedList is Empty");
});

test("删除尾结点 removeLast", () => {
  expect(linkedList.removeLast()).toBe(5);
  expect(linkedList.size).toBe(4);
  expect(linkedList.toString()).toBe("1,2,3,4");
  expect(linkedList.head.element).toBe(1);
  expect(linkedList.tail.element).toBe(4);

  for (let i = 0; i < 3; i++) {
    linkedList.removeLast();
  }
  expect(linkedList.size).toBe(1);
  expect(linkedList.toString()).toBe("1");
  expect(linkedList.head.element).toBe(1);
  expect(linkedList.tail.element).toBe(1);

  linkedList.removeLast();
  expect(linkedList.size).toBe(0);
  expect(linkedList.toString()).toBe("");
  expect(linkedList.head).toBeNull();
  expect(linkedList.tail).toBeNull();
});

test("删除空链表的尾结点", () => {
  const linkedList = new SinglyLinkedList();
  expect(() => {
    linkedList.removeLast();
  }).toThrowError("LinkedList is Empty");
});

test("测试删除指定元素", () => {
  const result = linkedList.removeElement(5);
  expect(result).toBeTruthy();
  expect(linkedList.size).toBe(4);
  expect(linkedList.toString()).toBe("1,2,3,4");
});

test("判断空链表是否为空", () => {
  const linkedList = new SinglyLinkedList();
  expect(linkedList.isEmpty()).toBeTruthy();
});

test("判断非空链表是否为非空", () => {
  expect(linkedList.isEmpty()).toBeFalsy();
});
