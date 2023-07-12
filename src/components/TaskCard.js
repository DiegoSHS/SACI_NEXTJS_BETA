import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { Button, Feed, Icon } from "semantic-ui-react"

export const TasksCards = ({ data }) => {
    const { tasks, setTasks, socket } = StoredContext()

    useEffect(() => {
        setTasks([...data])
    }, [])

    useEffect(() => {
        socket.on('recieve-notification', (notification) => {
            setTasks([...tasks, notification])
        })
        socket.on('deleted-notifications', () => {
            setTasks([])
        })
        socket.on('deleted-notification', (id) => {
            setTasks(tasks.filter(task => task._id !== id))
        })
    }, [])

    const handleDeleteAll = () => {
        socket.emit("delete-notifications")
    }

    return (
        <Feed centered>
            <Button basic content='Eliminar notificaciones' icon='fi-rr-check' onClick={handleDeleteAll} />
            {
                tasks.map(e => TaskCard(e, socket))
            }
        </Feed>
    )
}

const TaskCard = (task, socket) => {
    const handleDelete = ({ target }) => {
        socket.emit("delete-notification", target.id)
    }
    return (
        <Feed.Event key={task._id}>
            <Feed.Label>
                <Icon name='fi-rr-trash' color='red' id={task._id} circular onClick={handleDelete} />
            </Feed.Label>
            <Feed.Content>
                <Feed.Summary>
                    {task.description}
                    <Feed.Date>
                        {task.date}
                    </Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>
    )
}