import { createContext, useContext, useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import axios from "axios"
import io from "socket.io-client"

export const Records = createContext()

export const StoredContext = () => useContext(Records)

export const Context = ({ children }) => {
    const [records, setrecords] = useState({}),
        [user, setUser] = useState({}),
        [socket, setSocket] = useState(io()),
        [tasks, setTasks] = useState([]),
        ctx = {
            records, setrecords,
            user, setUser,
            socket, setSocket,
            tasks, setTasks
        },
        socketInit = async () => {
            await axios.get('/api/socket')
            setSocket(io())
            return () => socket.disconnect()
        },
        sesionInit = async () => {
            const session = window.location.hostname === 'localhost' ? {
                user: {
                    name: 'Jhon Doe',
                    email: 'something@example.com',
                    image: 'https://lh3.googleusercontent.com/a/AAcHTteDid88LgJbjhFjiv9paLPNOnM1pBOasbz0DKgHdZpMD3o=s96-c'
                }
            }
                : await getSession()
            setUser(session.user)
        }

    useEffect(() => {
        sesionInit()
        socketInit()
    }, [])

    return (
        <Records.Provider value={ctx}>
            {children}
        </Records.Provider>
    )
}
