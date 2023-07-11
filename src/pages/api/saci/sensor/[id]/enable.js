import { connex } from "@/models/dbconn"
import { enableActuator, getActuator } from "@/models/transactions/sensor"
import { validState } from "@/validation/transaction"

const handler = async (req, res) => {
    const collection = await connex(process.env.SDB, 'sensors'),
        { method, body, query: { id } } = req
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
        case "POST":
            try {
                const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
                const { valid, errors } = validState(parsedBody)
                if (!valid) return res.status(400).json({ msj: "Invalid state", errors })
                const { enable } = parsedBody
                const result = await enableActuator(collection, id, enable)
                console.log(`Actuator ${id} ${enable ? 'enabled' : 'disabled'}`)
                return res.status(200).json(result)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handler