import { Server } from "socket.io"

const socketHandler = async (req, res) => {
    let acknoledged = []
    if (!res.socket.server.io) {
        console.log('setting socket')
        const io = new Server(res.socket.server, {
            cors: { origin: '*', methods: ['GET', 'POST'], credentials: true },
            transports: ['websocket', 'polling', 'flashsocket'],
            allowEIO3: true
        })
        res.socket.server.io = io
        io.on("connection", (socket) => {
            socket.on("send-newactuator", (actuator) => {
                io.emit("recieve-newactuator", actuator)
            })
        })
        console.log('setting socket')
    }
    return res.end()
}

export default socketHandler