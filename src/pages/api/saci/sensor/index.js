import { connex } from '@/models/dbconn'
import { validSensor } from '@/validation/transaction'

const handler = async (req, res) => {
    const collection = await connex(process.env.SDB, 'sensors')
    const { method, body } = req
    switch (method) {
        case "GET":
            try {
                const sensors = await collection.find().toArray()
                console.log('Sensors retrieved')
                return res.status(200).json(sensors)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                const { valid, errors } = validSensor(body)
                if (!valid) {
                    console.log(`Invalid sensor data: ${errors}`)
                    return res.status(400).json({ msj: "Invalid sensor data", errors })
                }
                console.log('Creating new sensor')
                const newSensor = await collection.insertOne({ body })
                return res.status(201).json(newSensor)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handler