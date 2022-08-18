# myFiber
type Fiber = {
  /************************  DOM 实例相关  *****************************/
  
  // 标记不同的组件类型, 值详见 WorkTag
  tag: WorkTag,
  
  // 组件类型 div、span、组件构造函数
  type: any,
  
  // 实例对象, 如类组件的实例、原生 dom 实例, 而 function 组件没有实例, 因此该属性是空
  stateNode: any,
  
  /************************  构建 Fiber 树相关  ***************************/
  
  // 指向自己的父级 Fiber 对象
  return: Fiber | null,
  
  // 指向自己的第一个子级 Fiber 对象
  child: Fiber | null,
  
  // 指向自己的下一个兄弟 iber 对象
  sibling: Fiber | null,
  
  // 在 Fiber 树更新的过程中，每个 Fiber 都会有一个跟其对应的 Fiber
  // 我们称他为 current <==> workInProgress
  // 在渲染完成之后他们会交换位置
  // alternate 指向当前 Fiber 在 workInProgress 树中的对应 Fiber
  alternate: Fiber | null,
  
  /************************  状态数据相关  ********************************/
  
  // 即将更新的 props
  pendingProps: any, 
  // 旧的 props
  memoizedProps: any,
  // 旧的 state
  memoizedState: any,
  
  /************************  副作用相关 ******************************/
  
  // 该 Fiber 对应的组件产生的状态更新会存放在这个队列里面 
  updateQueue: UpdateQueue<any> | null,
  
  // 用来记录当前 Fiber 要执行的 DOM 操作
  effectTag: SideEffectTag,
  
  // 存储第一个要执行副作用的子级 Fiber 对象
  firstEffect: Fiber | null,
  
  // 存储下一个要执行副作用的子级 Fiber 对象
  // 执行 DOM 渲染时要先通过 first 找到第一个, 然后通过 next 一直向后查找
  nextEffect: Fiber | null,
  
  // 存储 DOM 操作完后的副作用 比如调用生命周期函数或者钩子函数的调用
  lastEffect: Fiber | null,
  
  // 任务的过期时间
  expirationTime: ExpirationTime,
  
  // 当前组件及子组件处于何种渲染模式 详见 TypeOfMode
  mode: TypeOfMode,
};
