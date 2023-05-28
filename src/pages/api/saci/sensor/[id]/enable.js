import { connex } from "@/models/dbconn"
import { getActuator } from "@/models/transactions/sensor"
import { validState } from "@/validation/transaction"

const handler = async (req, res) => {
    const { method, body, query: { id } } = req
    const { collection } = await connex(process.env.SDB, 'sensors')
    switch (method) {
        case "GET":
            try {
                const sensor = await getActuator(collection, id)
                if (sensor.length === 0) return res.status(404).json({ error: "Invalid actuator" })
                return res.status(200).json(sensor[0])
            }
            catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "PUT":
            try {
                const valid = validState(body, id)
                if (!valid) return res.status(400).json({ error: "Invalid state data" })
                const { enable } = body
                const result = await collection.updateOne({ name: id }, { $set: { state: enable } })
                return res.status(200).json(result)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handler