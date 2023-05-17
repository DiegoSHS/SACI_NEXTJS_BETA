import { connex } from "@/models/dbconn"

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

export const validOnelog = (log) => {
    const { id, value } = log
    const fields = Object.values(log)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof id !== 'string') errors.push(false)
    if (typeof value !== 'number') errors.push(false)
    return (errors.length === 0 && valid)
}

export const validLogs = (logs) => {
    const valid = logs.every(validLog)
    return valid
}

const checkValue = (value, min, max) => ({
    type: value < min ? 'under the minimum' : value > max ? 'above the maximum' : false,
    critic: value < min || value > max
})

const createTask = async (id, type) => {
    const { collection } = await connex(process.env.TDB, 'tasks')
    const fields = {
        title: `Critical value in sensor ${id}`,
        description: `The value is ${type}`
    }
    const task = await collection.insertOne(fields)
    return task
}

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

export const validSensor = (sensor) => {
    const { name, description, min, max, status, module, pin } = sensor
    const fields = Object.values(sensor)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof name !== 'string') errors.push(false)
    if (typeof description !== 'string') errors.push(false)
    if (typeof min !== 'number') errors.push(false)
    if (typeof max !== 'number') errors.push(false)
    if (typeof status !== 'boolean') errors.push(false)
    if (typeof module !== 'string') errors.push(false)
    if (typeof pin !== 'number') errors.push(false)
    return (errors.length === 0 && valid)
}

export const validTask = (task) => {
    const { title, description } = task
    const fields = Object.values(task)
    const valid = fields.every((e) => e !== undefined && e !== null)
    const errors = []
    if (typeof title !== 'string') errors.push(false)
    if (typeof description !== 'string') errors.push(false)
    return (errors.length === 0 && valid)
}
