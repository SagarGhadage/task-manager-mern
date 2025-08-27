const { Task } = require('../models/')
const getTaskById = async (user,taskId) => {
    try {
        const task = await Task.findOne({where:{id:taskId,userId:user.id}})
        // console.log(task)
        return task
    } catch (error) {
        throw error
    }
}


const getTasks = async (user) => {
    // console.log(user.email,'email')
    try {
        const tasks = await Task.findAll({where:{userId:user.id}})
        // console.log(tasks,'tasks')
        if (!tasks) {
            return {tasks:[]}
        }
        return {tasks}
    } catch (error) {
        throw error
    }
}
const creteTask = async (user,task) => {
    // console.log(task,'task')
    try {
        const tasks = await Task.create({ ...task,userId:user.id })
        // console.log(tasks)
        return tasks
    } catch (error) {
        throw error
    }
}
const updateTaskById = async (user,taskId, task) => {
    try {
        const taskToUpdate = await Task.findOne({where:{id:taskId,userId:user.id}})
        if (!taskToUpdate) {
            return null
        }
        const { title, description, dueDate ,effortToComplete} = task
        if (dueDate) {
            taskToUpdate.dueDate = dueDate
        }
        if (title) {
            taskToUpdate.title = title
        }
        if (description) {
            taskToUpdate.description = description
        }
        if (task.effortToComplete) {
            taskToUpdate.effortToComplete = task.effortToComplete
        }
        await taskToUpdate.save()
        return taskToUpdate

    } catch (error) {
        throw error
    }
}

const deleteTaskById = async (user,taskId) => {
    try {
        const task = await Task.findOne({where:{id:taskId,userId:user.id}})
        if (!task){
            return 0
        } 
            return (await Task.destroy({where:{ id: taskId,userId:user.id}}))

    } catch (error) {
        throw error
    }
}
module.exports = {
    deleteTaskById, updateTaskById, creteTask, getTasks, getTaskById
}