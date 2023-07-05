import { TasksCards } from "@/components/TaskCard"
import { NoData } from "@/components/NoTasks"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { connex } from "@/models/dbconn"
import { Header } from "semantic-ui-react"
import { getLogs } from "@/models/transactions/logs"

const Notifications = ({ data }) => {
    const { tasks, setTasks, socket } = StoredContext()
    useEffect(() => {
        setTasks(data)
        socket.on('recieve-notification', (notification) => {
            console.log([...tasks, notification])
            //setTasks()
        })
        socket.on('deleted-notification', (id) => {
            const newTasks = tasks.filter(task => task._id !== id)
            setTasks(newTasks)
        })
    }, [])

    return (
        <>
            <Header size="large">Notificaciones</Header>
            {
                tasks === undefined || tasks.length === 0 ? <NoData /> : <TasksCards data={tasks} />
            }
        </>
    )
}

export const getStaticProps = async ctx => {
    const { collection } = await connex(process.env.TDB, 'tasks')
    const data = await getLogs(collection)
    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default Notifications