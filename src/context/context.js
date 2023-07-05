import { createContext, useContext, useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import axios from "axios"
import io from "socket.io-client"

export const Records = createContext()

export const StoredContext = () => useContext(Records)

export const Context = ({ children }) => {
    const [records, setrecords] = useState({})
    const [user, setUser] = useState({})
    const [socket, setSocket] = useState(io())
    const [tasks, setTasks] = useState([])

    const socketInit = async () => {
        await axios.get('/api/socket')
        setSocket(io())
        return () => socket.disconnect()
    }

    const sesionInit = async () => {
        const session = await getSession()
        setUser(session.user)
    }

    useEffect(() => {
        sesionInit()
        socketInit()
    }, [])

    const ctx = {
        records, setrecords,
        user, setUser,
        socket, setSocket,
        tasks, setTasks
    }

    return (
        <Records.Provider value={ctx}>
            {children}
        </Records.Provider>
    )
}
