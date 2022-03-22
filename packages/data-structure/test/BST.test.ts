import BST from "../src/Tree/BST";

let bst: BST<number>;

beforeEach(() => {
  bst = new BST<number>();
  bst.insert(11);

  bst.insert(7);
  bst.insert(15);
  bst.insert(5);
  bst.insert(3);
  bst.insert(9);
  bst.insert(8);
  bst.insert(10);
  bst.insert(13);
  bst.insert(12);
  bst.insert(14);
  bst.insert(20);
  bst.insert(18);
  bst.insert(25);
  bst.insert(6);
});

test("插入元素", () => {
  bst.insert(6);

  const result: number[] = [];
  bst.levelOrder((number) => {
    result.push(number);
  });
  expect(result).toEqual([11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25]);
  expect(bst.size).toBe(15);
});

test("广度优先遍历", () => {
  const result: number[] = [];
  bst.levelOrder((number) => {
    result.push(number);
  });
  expect(result).toEqual([11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25]);
});

test("空二叉搜索树的广度优先遍历", () => {
  const bst = new BST();
  let count = 0;
  bst.levelOrder(() => {
    count++;
  });
  expect(count).toBe(0);
});

test("前序遍历", () => {
  const result = [];
  bst.preOrderTraverse((number) => {
    result.push(number);
  });

  expect(result).toEqual([11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]);
});

test("中序遍历", () => {
  const result = [];
  bst.inOrderTraverse((number) => {
    result.push(number);
  });
  expect(result).toEqual([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]);
});

test("后续遍历", () => {
  const result = [];
  bst.postOrderTraverse((number) => {
    result.push(number);
  });
  expect(result).toEqual([3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]);
});

test("查找元素", () => {
  expect(bst.search(3)).toBeTruthy();
});

test("查找非空二叉树不存在的元素", () => {
  expect(bst.search(100)).toBeFalsy();
});

test("最小值", () => {
  expect(bst.min().key).toBe(3);
});

test("空二叉搜索树的最小值", () => {
  const bst = new BST();
  expect(bst.min()).toBeNull();
});

test("最大值", () => {
  expect(bst.max().key).toBe(25);
});

test("空二叉搜索树的最大值", () => {
  const bst = new BST();
  expect(bst.max()).toBeNull();
});

test("删除最小节点", () => {
  expect(bst.removeMin().key).toBe(3);

  const result = [];
  bst.inOrderTraverse((num) => {
    result.push(num);
  });
  expect(result).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]);
  expect(bst.size).toBe(14);
});

test("删除最大节点", () => {
  expect(bst.removeMax().key).toBe(25);

  const result = [];
  bst.inOrderTraverse((num) => {
    result.push(num);
  });
  expect(result).toEqual([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20]);
  expect(bst.size).toBe(14);
});

test("删除某个节点", () => {
  bst.remove(10);

  const result = [];
  bst.inOrderTraverse((num) => {
    result.push(num);
  });
  expect(result).toEqual([3, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 18, 20, 25]);
  expect(bst.size).toBe(14);
});
