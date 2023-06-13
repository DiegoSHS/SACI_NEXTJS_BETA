/**
 * Valifate the form of the tasks
 * @param {Object} task object with the task data
 * @returns 
 */
export const validTaskForm = (task) => {
    const errorss = {}
    const { title, description } = task
    const fields = Object.values(task)
    if (!title) errorss.title = "Title is required"
    if (!description) errorss.description = "Description is required"
    const isValid = fields.every(field => field !== "" && field !== undefined)
    return { errorss, isValid }
}
/**
 * Validate the form of the sensors
 * @param {Object} sensor object with the sensor data
 * @returns 
 */
export const validSensorForm = (sensor) => {
    const errors = {}
    const fields = Object.values(sensor)
    const { name, description, min, max, module, pin } = sensor
    if (!name) errors.name = "Name is required"
    if (!description) errors.description = "Description is required"
    if (!min) errors.min = "Minimun is required"
    if (!max) errors.max = "Maximun is required"
    if (!module) errors.module = "Module is required"
    if (!pin) errors.pin = "Pin is required"
    const isValid = fields.every(field => field !== "" && field !== undefined)
    return { errors, isValid }
}