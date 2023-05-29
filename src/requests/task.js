import axios from "axios"
/**
 * Create a new task
 * @param {Object} task object with the task data
 * @returns 
 */
export const createTask = async (task) => {
    try {
        await axios.post('/api/tasks', task)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
/**
 * 
 * @param {Object} task object with the new task data
 * @param {String} id id of the task
 * @returns 
 */
export const updateTask = async (task, id) => {
    try {
        await axios.put(`/api/tasks/${id}`, task)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
/**
 * Get the data for a specific task
 * @param {String} id id of the task
 * @returns 
 */
export const getTask = async (id) => {
    const res = await axios.get(`/api/tasks/${id}`)
    console.log(res)
    return data
}
/**
 * Delete a task
 * @param {String} id id of the task
 * @returns 
 */
export const deleteTask = async (id) => {
    try {
        const { data } = await axios.delete(`/api/tasks/${id}`)
        return data
    } catch (error) {
        console.log(error)
        return false
    }
}