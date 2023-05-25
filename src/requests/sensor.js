import axios from "axios"

const url = '/api/saci'

export const createSensor = async (sensor) => {
    try {
        await axios.post(`${url}/sensor`, sensor)
        return true
    } catch (error) {
        return 
    }
}
export const updateSensor = async (sensor, id) => {
    try {
        await axios.put(`${url}/sensor/${id}`, sensor)
        return true
    } catch (error) {
        return
    }
}

export const enableSensor = async (id, enable) => {
    try {
        await axios.put(`${url}/sensor/${id}/enable`, { enable })
        return true
    } catch (error) {
        return
    }
}