import { connex } from "@/models/dbconn"
import { getActuators } from "@/models/transactions/sensor"
const handler = async (req, res) => {
    const { method } = req
    try {
        switch (method) {
            case 'GET':
                const collection = await connex(process.env.SDB, 'sensors'),
                    actuators = await getActuators(collection)
                return res.status(200).json(actuators)
            default:
                return res.status(405).json({ message: `Method ${method} not allowed` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default handler