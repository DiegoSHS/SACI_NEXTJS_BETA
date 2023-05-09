import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"

const handeling = async (req, res) => {
    const { method, body } = req
    const { collection } = await connex(process.env.SDB, 'logs')

    switch (method) {
        case "GET":
            try {
                const tasks = await collection.aggregate([{ $sort: { createdAt: -1 } }, { $project: { _id: 0 } }]).toArray()
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                if (body instanceof Array) {
                    if (body.length === 0) return res.status(400).json({ msj: "No body provided" })
                    const newtask = await collection.insertMany(body)
                    return res.status(201).json(newtask)
                }
                const { id, value } = body
                const logbody = { id, value, date: formatter(), ...formatter('', false) }
                const newtask = await collection.insertOne(logbody)
                return res.status(201).json(newtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedtask = await collection.deleteMany({})
                return res.status(204).json(deletedtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling
