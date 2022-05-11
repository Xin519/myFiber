import { updateNodeElement } from "../DOM"
import { CreateTaskQueue, arrified, createStateNode, getTag, getRoot } from "../Misc"

const taskQueue = CreateTaskQueue()
let subTask = null // 任务
let pendingCommit = null // 待获取的fiber根节点

const commitAllWork = fiber => {

  let currentFiber = fiber.firstEffect

  while (currentFiber) {
    if (currentFiber.tag === 'class_component') {
      currentFiber.stateNode.__fiber = currentFiber
    }

    if (currentFiber.effectTag === 'placement') { // 初始化
      let fiber = currentFiber
      if (fiber.tag === 'host_component') { // 只有普通节点 可以appendChild
        let parentFiber = currentFiber.parent
        while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') { // 过滤掉class function
          parentFiber = parentFiber.parent
        }
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    } else if (currentFiber.effectTag === 'update') { // 更新
      if (currentFiber.type === currentFiber.alternate.type) {
        // 节点相同
        updateNodeElement(currentFiber.stateNode, currentFiber, currentFiber.alternate)
      } else {
        // 不同
        currentFiber.parent.stateNode.replaceChild(currentFiber.stateNode, currentFiber.alternate.stateNode) // 直接替换
      }
    } else if (currentFiber.effectTag === 'delete') {debugger // 删除
      currentFiber.parent.stateNode.removeChild(currentFiber.stateNode)
    }

    currentFiber = currentFiber.nextEffect

  }

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

      newFiber = {
        type: alternate.type,
        props: {...alternate.type, children: []},
        tag: alternate.tag,
        effects: [],
        effectTag: "delete", // 当前 Fiber 要被执行的操作 (新增, 删除, 修改)
        parent: fiber, // 当前 Fiber 的父级 Fiber
        alternate,
        stateNode: alternate.stateNode
      }

      // alternate.effectTag = 'delete'
      // fiber.effects.push(alternate)
      // console.log(alternate)
      // prevFiber.sibling = newFiber
      // newFiber = alternate

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
    } else if (newFiber) {
      console.log(newFiber.effectTag)
      prevFiber.sibling = newFiber // 第二 。。。个子节点 设置为上一个子节点的兄弟节点
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
    newFiber = null
  }
}

var completeUnitOfWork = workInProgressFiber => {
  // 1 jsx parent => p.lastEffect = jsx 

  // 2 p.lastEffect = jsx.nextEffect => p parent => dav.lastEffect = p

  // 3 fiber parent = p.lastEffect = fiber

  // 4 p.lastEffect = fiber 

  // 获取当前 Fiber 的父级

  const returnFiber = workInProgressFiber.parent //div
  // 父级是否存在
  // if (returnFiber) { // ok
  //   // 需要执行 DOM 操作
  //   if (workInProgressFiber.effectTag) {
  //     if (!returnFiber.lastEffect) {
  //       returnFiber.lastEffect = workInProgressFiber.lastEffect
  //     }

  //     if (!returnFiber.firstEffect) {
  //       returnFiber.firstEffect = workInProgressFiber.firstEffect
  //     }

  //     if (workInProgressFiber.sibling) {
  //       workInProgressFiber.sibling.lastEffect = workInProgressFiber
  //     }
  //     if (returnFiber.lastEffect) {
  //       if (returnFiber.lastEffect.nextEffect) {
  //         returnFiber.lastEffect.nextEffect.nextEffect = workInProgressFiber
  //       } else {
  //         returnFiber.lastEffect.nextEffect = workInProgressFiber
  //       }

  //     } else {
  //       returnFiber.firstEffect = workInProgressFiber
  //     }
  //     returnFiber.lastEffect = workInProgressFiber
  //   }
  // }

  // 将子树和此 Fiber 的所有副作用附加到父级的 effect 列表上

  // 以下两个判断的作用是搜集子 Fiber的 effect 到父 Fiber
  
  if (!returnFiber.firstEffect) {
    // first
    returnFiber.firstEffect = workInProgressFiber.firstEffect;
  }
  if (workInProgressFiber.lastEffect) {
    if (returnFiber.lastEffect) {
      // next
      returnFiber.lastEffect.nextEffect = workInProgressFiber.firstEffect;
    }
    // last
    returnFiber.lastEffect = workInProgressFiber.lastEffect;
  }
  if (returnFiber.lastEffect) {
    returnFiber.lastEffect.nextEffect = workInProgressFiber;
  } else {
    // 为 fiberRoot 添加 firstEffect
    returnFiber.firstEffect = workInProgressFiber;
  }
  // 为 fiberRoot 添加 lastEffect
  returnFiber.lastEffect = workInProgressFiber;
  // }

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
    completeUnitOfWork(currentExecutelyFiber)


    if (currentExecutelyFiber.sibling) { // 判断是否有同集 返回同集
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent // 获取父级
  }
  pendingCommit = currentExecutelyFiber // 获取最顶层

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
