import { formatter } from "@/utils/dateformat"
import { Server } from "socket.io"

const socketHandler = async (req, res) => {
    const { collection } = await connex(process.env.TDB, 'tasks')
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
                const date = formatter()
                const taskbody = { ...notification, date }
                await collection.insertOne(taskbody)
                io.emit("recieve-notification", taskbody)
            })
        })
        res.socket.server.io = io
    } else {
        console.log('using existing socket')
    }
    res.end()
}

export default socketHandler