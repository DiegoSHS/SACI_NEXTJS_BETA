import { Card } from "semantic-ui-react"

export const TasksCards = ({data}) => {
    return (
        <Card.Group centered>
            {
                data.map(TaskCard)
            }
        </Card.Group>
    )
}

const TaskCard = (task) => {
    return (  
        <Card borderless>
            <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <Card.Description>{task.description}</Card.Description>
            </Card.Content>
        </Card>
    )
}