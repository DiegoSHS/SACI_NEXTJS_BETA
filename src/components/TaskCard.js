import { useRouter } from "next/router"
import { Button, Card, Icon } from "semantic-ui-react"

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
    const router = useRouter()
    return (
        <Card key={task._id} borderless>
            <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button primary circular animated="fade" style={{ margin: '1px' }} onClick={() => router.push(`/tasks/${task._id}`)}>
                    <Button.Content visible>Ver</Button.Content>
                    <Button.Content hidden>
                        <Icon name="eye"></Icon>
                    </Button.Content>
                </Button>
                <Button secondary circular animated="fade" style={{ margin: '1px' }} onClick={() => router.push(`/tasks/${task._id}/edit`)}>
                    <Button.Content hidden>Editar</Button.Content>
                    <Button.Content visible>
                        <Icon name="edit"></Icon>
                    </Button.Content>
                </Button>
            </Card.Content>
        </Card>
    )
}