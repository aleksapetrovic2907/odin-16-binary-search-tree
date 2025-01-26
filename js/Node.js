export class Node {
  /**
   * @param {any} value: value of node
   * @param {Node} left: reference to left node
   * @param {Node} right: reference to right node
   */
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
