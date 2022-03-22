export interface DoublyLinkedListInferface<T> {
  /** 向链表某个索引位置添加元素 */
  add: (index: number, element: T) => void;
  /** 向链表开头插入一个元素, O(1) */
  addFirst: (element: T) => void;
  /** 向链表尾部添加一个新元素，O(n) */
  addLast: (element: T) => void;

  /** 根据索引获取链表元素, O(n) */
  get: (index: number) => T;
  /** 获取链表第一个元素, O(1) */
  getFirst: () => T;
  /** 获取链表最后一个元素, O(n) */
  getLast: () => T;

  /** 从链表中移除一个元素，返回删除的元素。O(n)（在链表中不是一个常用的操作，练习用） */
  remove: (index: number) => T;
  /** 从链表中删除第一个元素, O(1) */
  removeFirst: () => T;
  /** 从链表中删除最后一个元素, O(n) */
  removeLast: () => T;
  /** 删除链表中指定元素的节点 */
  removeElement: (val: T) => void;

  /** 修改链表索引为 index 的元素, O(n)（不是常用操作，练习用） */
  set: (index: number, element: T) => void;
  /** 查找链表中是否有元素 e, O(n) */
  contains(element: T): boolean;
  /** 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false */
  isEmpty: () => void;
  /** 返回链表包含的元素个数，与数组的length属性类似 */
  getSize: () => number;
  /** 返回表示整个链表的字符串。由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值 */
  toString: () => string;
}
