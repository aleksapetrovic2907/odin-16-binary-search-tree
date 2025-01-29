import { Node } from "./Node.js";
import { Queue } from "./collections/Queue.js";
import { Stack } from "./collections/Stack.js";

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
   * Removes a node with the specified value from the binary search tree.
   * @param {any} value - The value of the node to remove.
   * @param {Node} [root=this.root] - The root node of the subtree to search. Defaults to the root of the tree.
   * @returns {Node|null} The new root node of the subtree after the removal, or `null` if the node is not found.
   */
  remove(value, root = this.root) {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.remove(value, root.left);
    } else if (value > root.value) {
      root.right = this.remove(value, root.right);
    } else {
      // Case 1: Node with 1 or less children.
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Case 2: Node with 2 children.
      const successor = this.getSmallestNode(root.right);
      root.value = successor.value;
      root.right = this.remove(successor.value, root.right);
    }

    return root;
  }

  /**
   * Finds a node with the given value in the binary search tree.
   * @param {number} value - The value to search for in the tree.
   * @param {Node} [root=this.root] - The root node to start the search from. Defaults to the root of the tree.
   * @returns {Node|null} The node with the specified value if found, or null if the value does not exist in the tree.
   */
  find(value, root = this.root) {
    if (!root) return null;

    if (value === root.value) {
      return root;
    } else if (value < root.value) {
      return this.find(value, root.left);
    } else if (value > root.value) {
      return this.find(value, root.right);
    }
  }

  /**
   * Performs a level-order (breadth-first) traversal of the binary tree,
   * starting from the given root node or the tree's root by default.
   * If the root is null or undefined, the method returns immediately without doing anything.
   *
   * @param {function} callback - A function to execute on each node during traversal.
   *                              The callback receives the current node as an argument.
   * @param {object} [root=this.root] - The starting node for the traversal. Defaults to the tree's root.
   * @throws {Error} Throws an error if the callback is not a function.
   */
  levelOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required in order to traverse.");
    }
    if (!root) return;

    const queue = new Queue();
    queue.enqueue(root);

    while (!queue.isEmpty) {
      const node = queue.dequeue();
      callback(node);

      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
    }
  }

  /**
   * Performs a preorder traversal of the binary tree, starting from the given root node or the tree's root by default.
   * The traversal visits the node first, then recursively visits the left subtree, followed by the right subtree.
   * If the root is null or undefined, the method returns immediately without doing anything.
   *
   * @param {function} callback - A function to execute on each node during traversal.
   *                              The callback receives the current node as an argument.
   * @param {object} [root=this.root] - The starting node for the traversal. Defaults to the tree's root.
   * @throws {Error} Throws an error if the callback is not a function.
   */
  preOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required in order to traverse.");
    }
    if (!root) return;

    const stack = new Stack();
    stack.push(root);

    while (!stack.isEmpty) {
      const node = stack.pop();
      callback(node);

      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
  }

  /**
   * Performs an in-order traversal of the binary tree, processing each node in the order:
   * left child, current node, right child.
   *
   * @param {function} callback - The function to be called with each node during the traversal.
   *                               The callback will receive the current node as its argument.
   * @param {Node} [root=this.root] - The root node of the tree or subtree to begin the traversal from.
   *                                  If not provided, the traversal starts from the root of the tree.
   *
   * @throws {Error} Throws an error if the provided callback is not a function.
   */
  inOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required in order to traverse.");
    }

    if (!root) return;

    const stack = new Stack();
    let currentNode = root;

    while (currentNode || !stack.isEmpty) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      callback(currentNode);

      currentNode = currentNode.right;
    }
  }

  /**
   * Performs a post-order traversal of the binary tree, processing each node in the order:
   * left child, right child, current node.
   *
   * @param {function} callback - The function to be called with each node during the traversal.
   *                               The callback will receive the current node as its argument.
   * @param {Node} [root=this.root] - The root node of the tree or subtree to begin the traversal from.
   *                                  If not provided, the traversal starts from the root of the tree.
   *
   * @throws {Error} Throws an error if the provided callback is not a function.
   */
  postOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is rqeuired in order to traverse.");
    }

    if (!root) return;

    const stack = new Stack();
    let currentNode = root;
    let lastVisitedNode = null;

    while (!stack.isEmpty || currentNode) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      let peekNode = stack.peek();

      if (peekNode.right && lastVisitedNode !== peekNode.right) {
        currentNode = peekNode.right;
      } else {
        callback(peekNode);
        lastVisitedNode = stack.pop();
      }
    }
  }

  /**
   * Calculates the height of the given node in the binary tree.
   * @param {Node} node - The node whose height is to be calculated.
   *                      If the node is null, the height is considered -1.
   * @returns {number} The height of the given node, or -1 if the node is null.
   */
  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  /**
   * Calculates the depth of the given node in the binary tree.
   * @param {Node} node - The node whose depth is to be calculated.
   *                      If the node is null, the depth is considered -1.
   * @returns {number} The depth of the given node, or -1 if the node is null.
   */
  depth(node) {
    if (!node) return -1;
    let currentNode = this.root;
    let depth = 0;

    while (currentNode !== node) {
      if (node.value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      depth++;
    }

    return depth;
  }

  /**
   * Checks if the binary search tree is balanced.
   * @param {Node} [node=this.root] - The root of the subtree to check. Defaults to the tree's root.
   * @returns {boolean} - Returns `true` if the tree is balanced, otherwise `false`.
   */
  isBalanced(root = this.root) {
    if (!root) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  /**
   * Rebalances the tree by performing an in-order traversal, extracting the values of the nodes,
   * and using these values to rebuild the tree.
   */
  rebalance() {
    const values = [];
    this.inOrder((node) => values.push(node.value));
    this.root = this.#buildTree(values);
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
