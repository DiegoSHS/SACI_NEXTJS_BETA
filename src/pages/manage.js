import { NoData } from "@/components/NoTasks"
import { ActuatorCards } from "@/components/SensorCard"
import { connex } from "@/models/dbconn"
import { getActuators } from "@/models/transactions/sensor"
import { useEffect } from "react"
import { Header } from "semantic-ui-react"
import axios from "axios"
import io from "socket.io-client"

let socketio

const State = ({ data }) => {
    const socket = socketio ? socketio : io()
    const socketInit = async () => {
        await axios.get('/api/socket')
        socketio = io()
        return () => socket.disconnect()
    }

    useEffect(()=>{
        socketInit()
    }, [])
    
    return (
        <>
            <Header size='large'>Control de actuadores</Header>
            {
                data === undefined || data.length === 0 ? <NoData /> : <ActuatorCards data={data} socket={socket} />
            }
        </>
    )
}

export const getStaticProps = async () => {
    const { collection } = await connex(process.env.SDB, 'sensors')
    const data = await getActuators(collection)
    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default State