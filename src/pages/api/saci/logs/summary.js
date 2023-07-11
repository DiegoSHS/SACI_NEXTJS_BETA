import { connex } from '@/models/dbconn'
import { getSummary } from '@/models/transactions/summary'

const summary = async (req, res) => {
    const collection = await connex(process.env.SDB, 'logs'),
        { method } = req
    switch (method) {
        case "GET":
            try {
                const summary = await getSummary(collection)
                return res.status(200).json(summary)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default summary