import { connex } from "@/models/dbconn"

const handeling = async (req, res) => {
    const { method, query: { id } } = req
    const { collection } = await connex(process.env.SDB, 'logs')
    switch (method) {
        case "GET":
            try {
                const logs = await collection.aggregate([
                    { $match: { id: id }},
                    { $sort: { date: -1 } },
                    { $limit: 50 },
                    { $project: { _id: 0 } }
                ]).toArray()
                return res.status(200).json(logs)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling