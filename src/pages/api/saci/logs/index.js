import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"
import { criticalTask, validLogs, validOnelog } from "@/validation/transaction"
import { getLogs } from "@/models/transactions"

const handeling = async (req, res) => {
    const { method, body } = req
    const { collection } = await connex(process.env.SDB, 'logs')

    switch (method) {
        case "GET":
            try {
                const logs = await getLogs(collection)
                return res.status(200).json(logs)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                if (body instanceof Array) {
                    const len = body.length
                    const first = body[0]
                    const last = body[len - 1]
                    const medium = body[len / 2]
                    const validate = validLogs([first, last, medium])
                    if (len === 0 || !validate) return res.status(400).json({ msj: "Invalid body" })
                    const newlogs = await collection.insertMany(body)
                    return res.status(201).json(newlogs)
                }
                const validate = validOnelog(body)
                if (!validate) return res.status(400).json({ msj: "Invalid body" })
                const newTask = await criticalTask(body)
                const logbody = { ...body, date: formatter(), ...formatter('', false) }
                const newlog = await collection.insertOne(logbody)
                return res.status(201).json(newlog, newTask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedtasks = await collection.deleteMany({})
                return res.status(204).json(deletedtasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling


/*
    los logs creados tienen la siguiente estructura:
    
    {
        _id: "id del log creado por mongo",
        id: "id del sensor",
        value: "valor medido por el sensor",
        date: "fecha de creacion del log en formato 'YYYY-MM-DD HH:mm:ss'",
        year: "año de creacion del log",
        month: "mes de creacion del log",
        monthName: "nombre del mes de creacion del log",
        day: "dia de creacion del log",
    }

    esta estructura fue escogida para poder realizar un mejor ordenamiento de los logs

*/