import { NoData } from "@/components/NoTasks"
import { ActuatorCards } from "@/components/SensorCard"
import { connex } from "@/models/dbconn"
import { getActuators } from "@/models/transactions/sensor"
import { Header } from "semantic-ui-react"

const State = ({data}) => {
    return (
        <>
            <Header size='large'>Control de actuadores</Header>
            {
                data === undefined || data.length === 0 ? <NoData /> : <ActuatorCards data={data} />
            }
        </>
    )
}

export const getServerSideProps = async () => {
    const { collection } = await connex(process.env.SDB, 'sensors')
    const data = await getActuators(collection)
    return {
        props: {
            data
        }
    }
}

export default State