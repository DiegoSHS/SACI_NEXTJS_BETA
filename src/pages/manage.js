import { NoData } from "@/components/NoTasks"
import { ActuatorCards } from "@/components/SensorCard"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/dbconn"
import { getActuators } from "@/models/transactions/sensor"
import { Header } from "semantic-ui-react"

const State = ({ data }) => {
    const { socket, user } = StoredContext()
    return (
        <>
            <Header size='large'>Control de actuadores</Header>
            {
                data === undefined || data.length === 0 ? <NoData /> : <ActuatorCards data={data} socket={socket} user={user} />
            }
        </>
    )
}

export const getStaticProps = async () => {
    const collection = await connex(process.env.SDB, 'sensors')
    const data = await getActuators(collection)
    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default State