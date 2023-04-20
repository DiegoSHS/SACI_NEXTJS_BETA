import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"

const handeling = async (req, res) => {
    const { method } = req
    const { collection } = await connex(process.env.SDB, process.env.SREGS)
    switch (method) {
        case "GET":
            try {
                const tasks = await collection.find().limit(20).sort({ createdAt: -1 }).toArray()
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling