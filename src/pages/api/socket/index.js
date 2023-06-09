import { Server } from "socket.io"
const socketHandler = (req, res) => {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on("connection", (socket) => {
        socket.on("send-sensor-state", (state) => {
            io.emit("recieve-sensor-state", state)
        })
    })

}

export default socketHandler