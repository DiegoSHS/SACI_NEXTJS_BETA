import axios from "axios"

export const createTask = async (task) => {
    try {
        await axios.post('/api/tasks', task)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateTask = async (task,id) => {
    try {
        await axios.put(`/api/tasks/${id}`, task)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const getTask = async (id, fn) => {
    const { data } = await axios.get(`/api/tasks/${id}`)
    fn(data)
}