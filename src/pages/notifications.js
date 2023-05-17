import { TasksCards } from "@/components/TaskCard"
import NoTasks from "@/components/NoTasks"

const Notifications = ({ tasks }) => {
    return (
        <>
            {
                tasks === undefined || tasks.length === 0 ? <NoTasks /> : <TasksCards data={tasks} />
            }
        </>
    )
}

export const getServerSideProps = async ctx => {
    const jsonTasks = await fetch(`${process.env.API_URL}/api/tasks/`)
    const tasks = await jsonTasks.json()
    return {
        props: {
            tasks,
        }
    }
}

export default Notifications