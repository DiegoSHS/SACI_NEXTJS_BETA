import { Server } from "socket.io"

const socketHandler = async (req, res) => {
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
                const createdAt = formatter()
                const updatedAt = formatter()
                const taskbody = { ...notification, createdAt, updatedAt }
                await collection.insertOne(taskbody)
                io.emit("recieve-notification", notification)
            })
        })
        res.socket.server.io = io
    } else {
        console.log('using existing socket')
    }
    res.end()
}

export default socketHandler