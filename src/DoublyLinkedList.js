class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
      this.current = newNode;
      return;
    }
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  forward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current;
  }

  back() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current;
  }
}