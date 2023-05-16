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
