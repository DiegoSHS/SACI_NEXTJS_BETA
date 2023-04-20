import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"
import { months } from "@/utils/sortRegisters"

const handeling = async (req, res) => {
    const { method, body } = req
    const { collection } = await connex(process.env.SDB, process.env.SREGS)
    
    const aggregations = (month) => {
        return collection.aggregate([
            { $match: { month: month } },
            { $sort: { createdAt: 1 } },
            {
                $group: {
                    _id: '$day',
                    uScm: { $avg: '$uScm' },
                    tds: { $avg: '$tds' },
                    nm: { $avg: '$nm' },
                    ppm: { $avg: '$ppm' },
                    month: { '$first': '$month' },
                    day: { '$first': '$day' }
                }
            },
            { $sort: { day: 1 }},
            { $project: { _id: 0, } }
        ]).toArray()
    }
    const monthsAvg = () => {
        return collection.aggregate([
            {
                $group: {
                    _id: '$month',
                    uScm: { $avg: '$uScm' },
                    tds: { $avg: '$tds' },
                    nm: { $avg: '$nm' },
                    ppm: { $avg: '$ppm' },
                    month: { '$first': '$month' },
                    monthName: { '$first': '$monthName' }
                }
            },
            { $sort: { month: 1 } },
            { $project: { _id: 0, } }
        ]).toArray()
    }

    switch (method) {
        case "GET":
            try {
                const avgs = months.map((e, i) => aggregations(i))
                const promises = await Promise.allSettled(avgs)
                const monthAvg = await monthsAvg()
                const yearAvg = promises.map(({ value }) => value)
                const tasks = await collection.aggregate([{$sort:{createdAt:-1}},{$project:{_id:0}}]).toArray()
                const result = { tasks, monthAvg, yearAvg }
                return res.status(200).json(result)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                if (body instanceof Array) {
                    if (body.length === 0) return res.status(400).json({ msj: "No body provided" })
                    const newtask = await collection.insertMany(body)
                    return res.status(201).json(newtask)
                }
                const createdAt = { timeStamp: formatter(), ...formatter('', false) }
                const taskbody = { ...body, createdAt }
                const newtask = await collection.insertOne(taskbody)
                return res.status(201).json(newtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedtask = await collection.deleteMany({})
                return res.status(204).json(deletedtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling
