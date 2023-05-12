import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"
import { ObjectId } from "mongodb"

const handeling = async (req, res) => {
    const { method, body: { title, description }, query: { id } } = req
    const { collection } = await connex(process.env.TDB, 'tasks')
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
                const updatedAt = formatter()
                const taskbody = { title, description, updatedAt }
                const newtask = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: taskbody })
                const updated = newtask.lastErrorObject.updatedExisting
                return (updated ? res.status(201).json(newtask) : res.status(404).json({ msj: "Object not found, nothing updated" }))
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedtask = await collection.findOneAndDelete({ _id: new ObjectId(id) })
                return res.status(204).json(deletedtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(501).json({ msj: "No support for this method" })
    }
}

export default handeling