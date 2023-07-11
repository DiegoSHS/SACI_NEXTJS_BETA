import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"
import { ObjectId } from "mongodb"
import { validTask } from "@/validation/transaction"

const handeling = async (req, res) => {
    const { method, body, query: { id } } = req,
        collection = await connex(process.env.TDB, 'tasks')
    switch (method) {
        case "GET":
            try {
                const task = await collection.findOne({ _id: new ObjectId(id) })
                return (task ? res.status(200).json(task) : res.status(404).json({ msj: "Object not found" }))
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "PUT":
            try {
                if (!validTask(body)) return res.status(400).json({ error: "Invalid task data" })
                const { title, description } = body,
                    updatedAt = formatter(),
                    taskbody = { title, description, updatedAt },
                    newtask = await conllection.updateOne({ _id: new ObjectId(id) }, { $set: taskbody }),
                    updated = newtask.lastErrorObject.updatedExisting
                return (updated ? res.status(201).json(newtask) : res.status(404).json({ msj: "Object not found, nothing updated" }))
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedTask = await collection.deleteOne({ _id: new ObjectId(id) })
                return res.status(204).json(deletedTask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(501).json({ msj: "No support for this method" })
    }
}

export default handeling