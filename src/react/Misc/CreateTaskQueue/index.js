const CreateTaskQueue = () => {
    const taskQueue = []

    return {
        push: item => taskQueue.push(item), // 添加
        pop: () => taskQueue.shift(), // 获取 先进先出
        isEmpty: () => taskQueue.length === 0, // 返回是否还有任务
        get: () => taskQueue
    }
}

export default CreateTaskQueue
