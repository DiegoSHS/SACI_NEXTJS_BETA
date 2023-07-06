import { TasksCards } from "@/components/TaskCard"
import { NoData } from "@/components/NoTasks"
import { connex } from "@/models/dbconn"
import { Header } from "semantic-ui-react"
import { getLogs } from "@/models/transactions/logs"

const Notifications = ({ data }) => {
    return (
        <>
            <Header size="large">Notificaciones</Header>
            {
                <TasksCards data={data} />
            }
        </>
    )
}

export const getServerSideProps = async ctx => {
    const collection = await connex(process.env.TDB, 'tasks')
    const data = await getLogs(collection)
    return {
        props: {
            data
        }
    }
}

export default Notifications