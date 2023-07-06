import { connex } from "@/models/dbconn"
import { formatter } from "@/utils/dateformat"
/**
 * Validate the log object (all fields)
 * @param {Object} log object with the log data
 * @returns {Boolean} true if the object is valid
 */
const validLog = (log) => {
    const { id, value, date, year, month, monthName, day } = log
    const fields = Object.values(log)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof id !== 'string') errors.push(false)
    if (typeof value !== 'number') errors.push(false)
    if (typeof date !== 'string') errors.push(false)
    if (typeof year !== 'number') errors.push(false)
    if (typeof month !== 'number') errors.push(false)
    if (typeof monthName !== 'string') errors.push(false)
    if (typeof day !== 'number') errors.push(false)
    return (errors.length === 0 && valid)
}
/**
 * Validate the log object (only id and value)
 * @param {Object} log object with the log data
 * @returns {Boolean} true if the object is valid
 */
export const validOnelog = (log) => {
    const { id, value } = log
    const fields = Object.values(log)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof id !== 'string') errors.push(false)
    if (typeof value !== 'number') errors.push(false)
    return (errors.length === 0 && valid)
}
/**
 * Validate an array of logs
 * @param {Array} logs array of logs
 * @returns {Boolean} true if all the logs are valid
 */
export const validLogs = (logs) => {
    const valid = logs.every(validLog)
    return valid
}
/**
 * Check if the value is under the minimum, above the maximum or normal
 * @param {Number} value the value to check
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @returns object with the type of the value and critic (true if the value is under the minimum or above the maximum)  
 */
const checkValue = (value, min, max) => ({
    type: value < min ? 'under the minimum' : value > max ? 'above the maximum' : 'normal',
    critic: value < min || value > max
})
/**
 * Create a task in the database
 * @param {String} id name of the sensor
 * @param {String} type type of the value (under the minimum or above the maximum)
 * @returns 
 */
const createTask = async (id, type) => {
    const { collection } = await connex(process.env.TDB, 'tasks')
    const fields = {
        title: `Critical value in sensor ${id}`,
        description: `The value is ${type}`,
        date: formatter()
    }
    const task = await collection.insertOne(fields)
    return task
}
/**
 * Check the minimun and maximun values of the sensor and create a task if the values in the log are under the minimum or above the maximum
 * @param {Object} log object with the log data
 * @returns false if the value is normal or the result of inserting the task
 */
export const criticalTask = async (log) => {
    const { id, value } = log
    const { collection } = await connex(process.env.SDB, 'sensors')
    const sensor = await collection.findOne({ name: id })
    const { min, max } = sensor
    const { type, critic } = checkValue(value, min, max)
    if (critic) {
        return await createTask(id, type)
    }
    return false
}
/**
 * Check if the sensor is valid (all fields)
 * @param {Object} sensor object with the sensor data
 * @returns {Object} returns an object with the result of the validation and the errors
 */
export const validSensor = (sensor) => {
    const { name, description, min, max, status, module, pin } = sensor
    const fields = Object.values(sensor)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof name !== 'string') errors.push('name is not a string')
    if (typeof description !== 'string') errors.push('description is not a string')
    if (typeof min !== 'number') errors.push('minimum is not a number')
    if (typeof max !== 'number') errors.push('maximum is not a number')
    if (typeof status !== 'boolean') errors.push('status is not a boolean')
    if (typeof module !== 'string') errors.push('module is not a string')
    if (typeof pin !== 'string') errors.push('pin is not a string')
    return { valid: errors.length === 0 && valid, errors }
}
/**
 * Check if the task is valid (only title and description)
 * @param {Object} task object with the task data
 * @returns {Boolean} true if the task is valid or false if not
 */
export const validTask = (task) => {
    const { title, description } = task
    const fields = Object.values(task)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof title !== 'string') errors.push(false)
    if (typeof description !== 'string') errors.push(false)
    return (errors.length === 0 && valid)
}
/**
 * Check if the state is valid and the sensor exists
 * @param {Object} body the body of the request
 * @returns {Object} an object with the result of the validation and the errors
 */
export const validState = (body) => {
    const errors = []
    if (typeof body.enable !== 'boolean') errors.push(`the new state is not a boolean, received ${typeof body.enable}`)
    return { valid: errors.length === 0, errors }
}