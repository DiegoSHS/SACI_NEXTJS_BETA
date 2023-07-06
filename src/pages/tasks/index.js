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
                data === undefined || data.length === 0 ? <NoData /> : <TasksCards data={data} />
            }
        </>
    )
}

export const getStaticProps = async ctx => {
    const collection = await connex(process.env.TDB, 'tasks')
    const data = await getLogs(collection)
    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default Notifications