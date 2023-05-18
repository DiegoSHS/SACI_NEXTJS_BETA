import axios from "axios"

export const createSensor = async (sensor) => {
    try {
        await axios.post('/api/sensors', sensor)
        return true
    } catch (error) {
        return false
    }
}
export const updateSensor = async (sensor, id) => {
    try {
        await axios.put(`/api/sensors/${id}`, sensor)
        return true
    } catch (error) {
        return false
    }
}
export const getSensor = async (id, fn) => {
    const { data } = await axios.get(`/api/sensors/${id}`)
    fn(data)
}