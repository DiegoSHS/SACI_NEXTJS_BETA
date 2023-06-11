import { Server } from "socket.io"

const socketHandler = async (req, res) => {
    if (!res.socket.server.io) {
        console.log('setting socket')
        const io = new Server(res.socket.server, {
            cors: { origin: '*', methods: ['GET','POST','OPTIONS','PATCH','DELETE','PUT'], credentials: true},
            transports: ['websocket', 'polling', 'flashsocket'],
            allowEIO3: true
        })
        io.on("connection", (socket) => {
            socket.broadcast.emit("user-connected")
            socket.on("send-newactuator", (actuator) => {
                io.emit("recieve-newactuator", actuator)
            })
        })
        res.socket.server.io = io
        console.log('setting socket')
    } else {
        console.log('using socket')
    }
    res.end()
}

export default socketHandler