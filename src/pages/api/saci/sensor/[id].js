import { ObjectId } from 'mongodb'
import { connex } from '@/models/dbconn'

const handler = async (req, res) => {
    const { collection } = await connex(process.env.SDB, 'sensors')
    const { method, body, query: { id } } = req
    switch (method) {
        case "GET":
            try {
                const sensor = await collection.findOne({ _id: new ObjectId(id) })
                return res.status(200).json(sensor)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "PUT":
            try {
                const validate = validSensor(body)
                if (!validate) return res.status(400).json({ error: "Invalid sensor data" })
                const newSensor = await collection.updateOne({ _id: new ObjectId(id) }, { $set: body })
                return res.status(201).json(newSensor)
            }
            catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const sensor = await collection.deleteOne({ _id: new ObjectId(id) })
                return res.status(200).json(sensor)
            }
            catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handler