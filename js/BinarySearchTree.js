import { Node } from "./Node.js";

export class BinarySearchTree {
  /**
   * @param {Array} values: sorted array in ascending order with deduplicated values
   */
  constructor(values) {
    this.root = this.#buildTree(values);
  }

  /**
   * Builds a binary search tree from an array of values.
   * @param {Array} values: sorted array in ascending order with deduplicated values
   * @returns {Node} root node of the tree
   */
  #buildTree(values) {
    if (values.length == 0) return null;

    const midIndex = Math.floor(values.length / 2);
    const root = new Node(values[midIndex]);

    root.left = this.#buildTree(values.slice(0, midIndex));
    root.right = this.#buildTree(values.slice(midIndex + 1));

    return root;
  }
}
