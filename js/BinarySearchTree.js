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

  /**
   * Inserts a new value into the binary search tree.
   * @param {number} value - The value to insert into the tree.
   * @param {Node} [root=this.root] - The current node to compare with. Defaults to the root of the tree.
   * @returns {Node} The root node of the tree after insertion.
   * @throws {Error} If the value already exists in the tree.
   */
  insert(value, root = this.root) {
    if (!root) {
      return new Node(value);
    }

    if (value === root.value) {
      throw new Error(`The value ${value} already exists in this tree.`);
    } else if (value < root.value) {
      root.left = this.insert(value, root.left);
    } else if (value > root.value) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  /**
   * Finds the node with the smallest value in the given subtree.
   * @param {Node} root - The root node of the subtree to search. Defaults to the root of the tree.
   * @returns {Node} The node with the smallest value in the subtree.
   */
  getSmallestNode(root = this.root) {
    while (root.left) {
      root = root.left;
    }

    return root;
  }

  /**
   * Finds the node with the largest value in the given subtree.
   * @param {Node} root - The root node of the subtree to search. Defaults to the root of the tree.
   * @returns {Node} The node with the largest value in the subtree.
   */
  getLargestNode(root = this.root) {
    while (root.right) {
      root = root.right;
    }

    return root;
  }
}
