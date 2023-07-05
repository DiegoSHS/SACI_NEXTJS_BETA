import { StoredContext } from "@/context/context"
import { dateDiff } from "@/utils/dateformat"
import { Button, Card, Feed, Icon, Label } from "semantic-ui-react"

export const TasksCards = ({ data }) => {
    const { socket } = StoredContext()
    const removeTask = (id) => {
        socket.emit('delete-notification', id)
    }
    return (
        <Feed centered>
            {
                data.map((e) => TaskCard(e, removeTask))
            }
        </Feed>
    )
}

const TaskCard = (task, removeTask) => {
    //const since = dateDiff(new Date(Date.now()), new Date(task.date))
    return (
        <Feed.Event key={task._id}>
            <Feed.Label>
                <Icon name='fi-rr-trash' color='red' id={task._id} circular onClick={(e) => {
                    removeTask(e.target.id)
                }} />
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