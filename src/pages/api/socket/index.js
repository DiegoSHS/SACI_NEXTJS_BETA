import { connex } from "@/models/dbconn"
import { ObjectId } from "mongodb"
import { Server } from "socket.io"

const socketHandler = async (req, res) => {
    const collection = await connex(process.env.TDB, 'tasks')
    if (!res.socket.server.io) {
        console.log('setting socket')
        const io = new Server(res.socket.server, {
            cors: { origin: '*', methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE', 'PUT'], credentials: true },
            transports: ['websocket', 'polling', 'flashsocket'],
            allowEIO3: true
        })
        io.on("connection", (socket) => {
            socket.broadcast.emit("user-connected")
            socket.on("send-newactuator", (actuator) => {
                io.emit("recieve-newactuator", actuator)
            })
            socket.on("send-notification", async (notification) => {
                const { insertedId } = await collection.insertOne(notification)
                io.emit("recieve-notification", { _id: insertedId.toString(), ...notification })
            })
            socket.on("delete-notification", async (id) => {
                console.log(id)
                await collection.deleteOne({ _id: new ObjectId(id) })
                console.log('deleted')
                io.emit("deleted-notification", id)
            })
            socket.on("delete-notifications", async () => {
                await collection.deleteMany({})
                io.emit("deleted-notifications")
            })
        })
        res.socket.server.io = io
    } else {
        console.log('using existing socket')
    }
    res.end()
}

export default socketHandler