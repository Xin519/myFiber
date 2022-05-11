import { updateNodeElement } from "../DOM"
import { CreateTaskQueue, arrified, createStateNode, getTag, getRoot } from "../Misc"

const taskQueue = CreateTaskQueue()
let subTask = null // 任务
let pendingCommit = null // 待获取的fiber根节点

const commitAllWork = fiber => {
  fiber.effects.forEach(i => {

    if (i.tag === 'class_component') {
      i.stateNode.__fiber = i
    }

    if (i.effectTag === 'placement') { // 初始化
      let fiber = i
      if (fiber.tag === 'host_component') { // 只有普通节点 可以appendChild
        let parentFiber = i.parent
        while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') { // 过滤掉class function
          parentFiber = parentFiber.parent
        }
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    } else if (i.effectTag === 'update') { // 更新
      if (i.type === i.alternate.type) {
        // 节点相同
        updateNodeElement(i.stateNode, i, i.alternate)
      } else {
        // 不同
        i.parent.stateNode.replaceChild(i.stateNode, i.alternate.stateNode) // 直接替换
      }
    } else if (i.effectTag === 'delete') { // 删除
      i.parent.stateNode.removeChild(i.stateNode)
    }
  });
  /**
   * 备份旧 fiber 
   * 备份到 根节点
   */
  fiber.stateNode.__rootFiberContainer = fiber
}

const reconcileChildren = (fiber, children) => {
  /**
   * children 可能对象 也可能是数组
   * 将children 转换成数组
   */
  const arrifiedChildren = arrified(children)

  let index = 0 // 索引
  let numberOfElement = arrifiedChildren.length // children 数组中元素的个数
  let element = null  // 循环过程中的 子节点 virtualDom对象
  let newFiber = null // 子集 fiber
  let prevFiber = null  // 上一个兄弟 fiber
  let alternate = null // 备份

  if (fiber.alternate && fiber.alternate.child) { // 条件 有备份 && 有子集
    alternate = fiber.alternate.child
  }

  while (index < numberOfElement || alternate) {
    // 子级 virtualDOM 对象
    element = arrifiedChildren[index]

    if (!element && alternate) { // 删除

      alternate.effectTag = 'delete'
      fiber.effects.push(alternate)

    } else if (element && alternate) { // 更新

      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update", // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber, // 当前 Fiber 的父级 Fiber
        alternate
      }

      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode
      } else {
        // 不相同
        newFiber.stateNode = createStateNode(newFiber)
      }

    } else if (element && !alternate) {
      // 子级 fiber 对象 初始化
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement", // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber // 当前 Fiber 的父级 Fiber
      }
      newFiber.stateNode = createStateNode(newFiber)
    }
    if (index === 0) {
      fiber.child = newFiber // 第一个子节点 设置为父节点的子节点
    } else if (element) {
      prevFiber.sibling = newFiber // 第二 。。。个子节点 设置为上一个子节点的兄弟节点
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = fiber => {

  if (fiber.tag === 'class_component') {
    if (fiber.stateNode.__fiber?.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState
      }
    }
    reconcileChildren(fiber, fiber.stateNode.render()) // 构建子集 fiber
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children) // 构建子集 fiber
  }
  if (fiber.child) { // 判断是否有子集 返回子集
    return fiber.child
  }

  let currentExecutelyFiber = fiber
  while (currentExecutelyFiber.parent) { // 循环获取父级
    /**
     * 设置父节点 effects 
     * effects 为当前父级 effects 和当前节点 effects 和 当前节点 合并的数组
     */
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )
    if (currentExecutelyFiber.sibling) { // 判断是否有同集 返回同集
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent // 获取父级
  }
  pendingCommit = currentExecutelyFiber // 获取最顶层
  // console.log(fiber)
}

const getFirstTask = () => {
  // 从任务队列获取任务
  const task = taskQueue.pop()

  /**
   * 初始化task为根节点
   * setState 需要手动获取根节点
   */

  if (task.from === 'class_component') {
    const root = getRoot(task.instance) // 根节点
    task.instance.__fiber.partialState = task.partialState
    return {
      props: root.props, // 节点属性
      stateNode: root.stateNode, // 节点 DOM 对象 | 组件实例对象
      tag: 'host_root', // 节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
      effects: [], // 数组, 存储需要更改的 fiber 对象
      child: null, // 当前 Fiber 的子级 Fiber
      alternate: root // Fiber 备份 fiber 比对时使用
    }
  }

  // 返回最外层节点的fiber对象
  return {
    props: task.props, // 节点属性
    stateNode: task.dom, // 节点 DOM 对象 | 组件实例对象
    tag: 'host_root', // 节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
    effects: [], // 数组, 存储需要更改的 fiber 对象
    child: null, // 当前 Fiber 的子级 Fiber
    alternate: task.dom.__rootFiberContainer // Fiber 备份 fiber 比对时使用
  }
}

const wookLoop = deadline => {
  if (!subTask) { // 判断有无任务
    subTask = getFirstTask() // 获取任务
  }
  /**
   * 有任务 并且有空余时间 循环执行任务
  */
  //  console.log(deadline.timeRemaining())
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask) // 执行 重新赋值
  }
  if (pendingCommit) { // commit 阶段
    console.log(pendingCommit)
    commitAllWork(pendingCommit)
  }
}

const performTask = deadline => {
  wookLoop(deadline) // 执行任务
  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务没有执行
   * 再一次告诉浏览器在空闲的时间执行任务
   */
  if (subTask || !taskQueue.isEmpty) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1. 向任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */
  /**
   * 任务就是通过 vdom 对象 构建 fiber 对象
   */
  taskQueue.push({
    dom, // root
    props: {
      children: element
    }
  })
  // console.log(taskQueue.pop())
  /**
   * 指定在浏览器空闲的时间去执行任务
   */
  requestIdleCallback(performTask)
}

export const scheduleUpdate = (instance, partialState) => { // setState
  taskQueue.push({
    from: "class_component",
    instance,
    partialState
  })
  requestIdleCallback(performTask)
}
