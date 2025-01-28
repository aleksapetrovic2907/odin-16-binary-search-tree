/**
 * A Queue implementation with FIFO (First-In-First-Out) behavior.
 */
export class Queue {
  #array;

  /**
   * Initializes an empty queue.
   */
  constructor() {
    this.#array = [];
  }

  /**
   * Gets the number of elements in the queue.
   * @returns {number} The number of elements in the queue.
   */
  get size() {
    return this.#array.length;
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} `true` if the queue is empty, otherwise `false`.
   */
  get isEmpty() {
    return this.size === 0;
  }

  /**
   * Adds a value to the end of the queue.
   * @param {*} value - The value to add to the queue.
   */
  enqueue(value) {
    this.#array.push(value);
  }

  /**
   * Removes and returns the element at the front of the queue.
   * @throws {Error} If the queue is empty.
   * @returns {*} The value removed from the front of the queue.
   */
  dequeue() {
    if (this.isEmpty) {
      throw new Error("Cannot dequeue from an empty queue.");
    }

    return this.#array.shift();
  }

  /**
   * Returns the element at the front of the queue without removing it.
   * @returns {*} The value at the front of the queue, or `null` if the queue is empty.
   */
  peek() {
    return this.isEmpty ? null : this.#array[0];
  }

  /**
   * Removes all elements from the queue.
   */
  clear() {
    this.#array = [];
  }
}
