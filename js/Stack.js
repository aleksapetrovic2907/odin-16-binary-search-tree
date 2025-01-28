/**
 * A Stack implementation with LIFO (Last-In-First-Out) behavior.
 */
export class Stack {
  #array;

  /**
   * Initializes an empty stack.
   */
  constructor() {
    this.#array = [];
  }

  /**
   * Gets the number of elements in the stack.
   * @returns {number} The number of elements in the stack.
   */
  get size() {
    return this.#array.length;
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} `true` if the stack is empty, otherwise `false`.
   */
  get isEmpty() {
    return this.size === 0;
  }

  /**
   * Adds a value to the top of the stack.
   * @param {*} value - The value to add to the stack.
   */
  push(value) {
    this.#array.push(value);
  }

  /**
   * Removes and returns the value at the top of the stack.
   * @throws {Error} If the stack is empty.
   * @returns {*} The value removed from the top of the stack.
   */
  pop() {
    if (this.isEmpty) {
      throw new Error("Cannot pop from an empty stack.");
    }
    return this.#array.pop();
  }

  /**
   * Returns the value at the top of the stack without removing it.
   * @returns {*} The value at the top of the stack, or `null` if the stack is empty.
   */
  peek() {
    return this.isEmpty ? null : this.#array[this.size - 1];
  }

  /**
   * Removes all elements from the stack.
   */
  clear() {
    this.#array = [];
  }
}
