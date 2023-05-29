import axios from "axios"
/**
 * @constant url - Base url for requests
 */
const url = '/api/saci'

/**
 * Create a new sensor
 * @param {Object} sensor object with the sensor data
 * @returns returns true if the request was successful
 */
export const createSensor = async (sensor) => {
    try {
        await axios.post(`${url}/sensor`, sensor)
        return true
    } catch (error) {
        return 
    }
}
/**
 * Get the data for a specific sensor
 * @param {String} id the id of the sensor
 * @returns returns the sensor data
 */
export const getSensor = async (id) => {
    try {
        const { data } = await axios.get(`${url}/sensor/${id}`)
        return data
    } catch (error) {
        return
    }
}
/**
 * 
 * @param {Object} sensor object with the sensor data
 * @param {String} id name of the sensor
 * @returns 
 */
export const updateSensor = async (sensor, id) => {
    try {
        await axios.put(`${url}/sensor/${id}`, sensor)
        return true
    } catch (error) {
        return
    }
}
/**
 * 
 * @param {String} id name of the sensor
 * @param {Boolean} enable state of the sensor
 * @returns 
 */
export const enableSensor = async (id, enable) => {
    try {
        await axios.put(`${url}/sensor/${id}/enable`, { enable })
        return true
    } catch (error) {
        return
    }
}