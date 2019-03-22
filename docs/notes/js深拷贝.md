# js深拷贝

```javascript
// 深度优先遍历
function deepTraversal1(node, nodeList = []) {
  if (node != null) {
    nodeList.push(node)
    const children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}

// 深度优先遍历
function deepTraversal2(node) {
  let nodeList = []
  if (node != null) {
    nodeList.push(node)
    const children = node.children
    for (let i = 0; i < children.length; i++) {
      nodeList = nodeList.concat(deepTraversal2(children[i]))
    }
  }
  return nodeList
}

// 深度优先遍历 非递归
function deepTraversal3(node) {
  const stack = []
  const nodeList = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      // 栈 后进先出
      const currentNode = stack.pop()
      if (currentNode != null) {
        nodeList.push(currentNode)
        const children = currentNode.children
        // 尾部开始入栈
        for (let i = children.length; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
  }
  return nodeList
}

// 广度优先 非递归
function widthTraversal(node) {
  const queue = []
  const nodeList = []
  if (node) {
    queue.push(node)
    while (queue.length) {
      // 队列 先进先出
      const currentNode = queue.shift()
      if (currentNode != null) {
        nodeList.push(currentNode)
        const children = currentNode.children
        for (let i = 0; i < children.length; i++) {
          queue.push(children[i])
        }
      }
    }
  }
  return nodeList
}

```

