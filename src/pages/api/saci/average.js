import { connex } from "@/models/dbconn"
import { months } from "@/utils/sortRegisters"

const handler = async (req, res) => {
    try {
        const { method, body } = req
        const { id } = body
        if (method !== 'GET') return res.status(405).json({ msj: "No support for this method" })

        const { collection } = await connex(process.env.SDB, 'logs')
        const aggregations = (month, id) => {
            return collection.aggregate([
                { $match: { month: month, id: id } },
                { $sort: { createdAt: 1 } },
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
        const monthsAvg = () => {
            const date = new Date(Date.now)
            const year = date.getFullYear()
            return collection.aggregate([
                { $match: { year: year } },
                {
                    $group: {
                        _id: '$month',
                        value: { $avg: '$value' },
                        month: { '$first': '$month' },
                        monthName: { '$first': '$monthName' }
                    }
                },
                { $sort: { month: 1 } },
                { $project: { _id: 0, } }
            ]).toArray()
        }


        const avgs = months.map((e, i) => aggregations(i, id))
        const promises = await Promise.allSettled(avgs)
        const monthAvg = await monthsAvg()
        const yearAvg = promises.map(({ value }) => value)
        return res.status(200).json({ yearAvg, monthAvg })
    } catch (error) {
        return res.status(500).json({ msj: error.message })
    }
}

export default handler
