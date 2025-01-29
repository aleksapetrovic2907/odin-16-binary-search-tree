import { BinarySearchTree } from "./BinarySearchTree.js";
import { TreePrinter } from "./TreePrinter.js";

// 1. Create a binary search tree from an array of random numbers < 100.
const randomsArray = Array.from(
  new Set(
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 100) + 1)
  )
).sort((a, b) => a - b);

const tree = new BinarySearchTree(randomsArray);
TreePrinter.print(tree.root);
window.tree = tree;

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log(`Tree is balanced: ${tree.isBalanced()}`);

// 3. Print out all elements in level, pre, post, and in order.
let printArray = [];
function addNodeToArray(node) {
  printArray.push(node.value);
}

tree.levelOrder(addNodeToArray);
console.log("Levelorder: ");
console.log(...printArray);

printArray = [];
tree.preOrder(addNodeToArray);
console.log("Preorder: ");
console.log(...printArray);

printArray = [];
tree.inOrder(addNodeToArray);
console.log("Inorder: ");
console.log(...printArray);

printArray = [];
tree.postOrder(addNodeToArray);
console.log("Postorder: ");
console.log(...printArray);

// 4. Unbalance the tree by adding several numbers > 100.
tree.insert(101);
tree.insert(102);
tree.insert(103);

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log(`Tree is balanced: ${tree.isBalanced()}`);

// 6. Balance the tree by calling rebalance.
tree.rebalance();
console.log("Rebalanced tree.");

// 7. Confirm that the tree is balanced by calling isBalanced.
console.log(`Tree is balanced: ${tree.isBalanced()}`);
