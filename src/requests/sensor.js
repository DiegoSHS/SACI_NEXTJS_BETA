import axios from "axios"

export const createSensor = async (sensor) => {
    try {
        await axios.post('/api/sensor', sensor)
        return true
    } catch (error) {
        return false
    }
}
export const updateSensor = async (sensor, id) => {
    try {
        await axios.put(`/api/sensor/${id}`, sensor)
        return true
    } catch (error) {
        return false
    }
}
export const getSensor = async (id, fn) => {
    const { data } = await axios.get(`/api/sensor/${id}`)
    fn(data)
}
export const enableSensor = async (id, enable) => {
    try {
        await axios.put(`/api/sensor/${id}/enable`, { enable })
        return true
    } catch (error) {
        return false
    }
}