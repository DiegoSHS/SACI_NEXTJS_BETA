import { connex } from "@/models/dbconn"
import { months } from "@/utils/sortRegisters"

const handler = async (req, res) => {
    try {
        const { method, query: { id } } = req
        if (method !== 'GET') return res.status(405).json({ msj: "No support for this method" })

        const { collection } = await connex(process.env.SDB, 'logs')
        const aggregations = (month, id) => {
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
        const monthsAvg = (id) => {
            const date = new Date(Date.now)
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

        const logs = await collection.aggregate([
            { $match: { id: id } },
            { $sort: { date: 1 } },
            { $limit: 50 },
            { $project: { _id: 0 } }
        ]).toArray()

        const avgs = months.map((e, i) => aggregations(i, id))
        const promises = await Promise.allSettled(avgs)
        const monthAvg = await monthsAvg(id)
        const days = promises.map(({ value }) => value)
        const daysAvg = days.filter(e => e.length > 0)
        return res.status(200).json({ logs, daysAvg, monthAvg })
    } catch (error) {
        return res.status(500).json({ msj: error.message })
    }
}

export default handler
