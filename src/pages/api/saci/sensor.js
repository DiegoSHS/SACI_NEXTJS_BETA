import { connex } from "@/models/dbconn"

export const handler = async(req, res) => {
    const {collection} = connex(process.env.SDB, process.env.SREGS)
    const aggregatios = async () => {
        collection.aggregate([
            { $match: { month: 0 } },
            { $sort: { createdAt: 1 } },
        ]).toArray()
    }
    try {
        const {method} = req
        switch (method) {
            case "GET":
                return res.status(200).json({msj: "GET method"})
            case "POST":
                return res.status(201).json({msj: "POST method"})
            default:
                return res.status(405).json({msj: "No support for this method"})
        }
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
