import { TasksCards } from "@/components/TaskCard"
import { NoData } from "@/components/NoTasks"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { validateFetch } from "../ground"
import { getLogs } from "@/models/transactions"
import { connex } from "@/models/dbconn"

const Notifications = ({ data }) => {
    const { records, setrecords } = StoredContext()
    useEffect(() => {
        setrecords({ saci: { ...records.saci, tasks } })
        console.log(records)
    }, [])

    const tasks = validateFetch(records, 'tasks') ? data : records.saci.tasks

    return (
        <>
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