import { getDetailedLogs } from "@/models/transactions/logs"
import { connex } from "@/models/dbconn"
const handler = async (req, res) => {
    try {
        const { method, query: { id } } = req
        if (method !== 'GET') return res.status(405).json({ msj: "No support for this method" })
        const { collection } = await connex(process.env.SDB, 'logs')
        const { logs, daysAvg, monthAvg } = await getDetailedLogs(collection, id)
        return res.status(200).json({ logs, daysAvg, monthAvg })
    } catch (error) {
        return res.status(500).json({ msj: error.message })
    }
}

export default handler
