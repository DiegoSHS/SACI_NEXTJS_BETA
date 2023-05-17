import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"
import { validTask } from "@/utils/validate"

const handeling = async (req, res) => {
    const { method, body } = req
    const { collection } = await connex(process.env.TDB, 'tasks')
    switch (method) {
        case "GET":
            try {
                const tasks = await collection.find().toArray()
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                const validate = validTask(body)
                if (!validate) return res.status(400).json({ error: "Invalid task data" })
                const createdAt = formatter()
                const updatedAt = formatter()
                const taskbody = { ...body, createdAt, updatedAt }
                const newtask = await collection.insertOne(taskbody)
                return res.status(201).json(newtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling