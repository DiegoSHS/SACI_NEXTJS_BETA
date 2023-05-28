import { months } from "@/utils/sortRegisters"

const serizalize = (data) => {
    const json = JSON.stringify(data)
    const parsed = JSON.parse(json)
    return parsed
}

export const aggregations = (collection, month, id) => {
    return collection.aggregate([
        { $match: { month: month, id: id } },
        { $sort: { date: 1 } },
        {
            $group: {
                _id: '$day',
                value: { $avg: '$value' },
                month: { '$first': '$month' },
                day: { '$first': '$day' }
            }
        },
        { $sort: { day: 1 } },
        { $project: { _id: 0, } }
    ]).toArray()
}

export const monthsAvg = (collection, id) => {
    return collection.aggregate([
        { $match: { id: id } },
        {
            $group: {
                _id: '$month',
                value: { $avg: '$value' },
                month: { '$first': '$month' },
                year: { '$first': '$year' },
                monthName: { '$first': '$monthName' }
            }
        },
        { $sort: { month: 1 } },
        { $project: { _id: 0, } }
    ]).toArray()
}

export const generateLogs = (collection, id) => {
    return collection.aggregate([
        { $match: { id: id } },
        { $sort: { date: 1 } },
        { $limit: 50 },
        { $project: { _id: 0 } }
    ]).toArray()
}

export const getDetailedLogs = async (collection, id) => {
    const logs = await generateLogs(collection, id)
    const monthAvg = await monthsAvg(collection, id)
    const avgs = months.map((e, i) => aggregations(collection, i, id))
    const promises = await Promise.allSettled(avgs)
    const days = promises.map(({ value }) => value)
    const daysAvg = days.filter(e => e.length > 0)
    return { logs, daysAvg, monthAvg }
}

export const getLogs = async (collection) => {
    const logs = await collection.find({}).toArray()
    const data = serizalize(logs)
    return data
}

export const getById = async (collection, id) => {
    const logs = await collection.find({ id: id }).toArray()
    const data = serizalize(logs)
    return data
}

export const getActuator = async (collection, id) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador', name: id } },
        { $project: { _id: 0,name:1,state:1 } }
    ]).toArray()
    return actuators
}

export const getActuators = async (collection) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador' } },
        { $project: { _id: 0 } }
    ]).toArray()
    return actuators
}
