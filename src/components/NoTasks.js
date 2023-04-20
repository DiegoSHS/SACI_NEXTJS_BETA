import { useRouter } from "next/router"
import { Button, Grid } from "semantic-ui-react"

const NoTasks = () => {
    const router = useRouter()
    return (
        <Grid centered verticalAlign="middle" columns={1}>
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>No hay nada para mostrar</h1>
                    <div>
                        <Button onClick={() => router.push('/tasks/new')} circular primary>
                            Crear tarea
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default NoTasks
