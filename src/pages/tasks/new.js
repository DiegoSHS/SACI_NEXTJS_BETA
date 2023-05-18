import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Container, Form, Grid, Icon } from "semantic-ui-react"

const TaksFormPage = () => {
    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    })

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

    const [isSaving, setisSaving] = useState(false)

    const { title, description } = errors

    const { query, push } = useRouter()

    const validate = () => {
        const errorss = {}
        const { title, description } = newTask
        if (!title) errorss.title = "Title is required"
        if (!description) errorss.description = "Description is required"
        const isValid = (title && description) || false
        return { errorss, isValid }
    }

    const handSubmit = async e => {
        e.preventDefault()
        let { errorss, isValid } = validate()
        let isSuccess = false
        if (Object.keys(errorss).length) setErrors(errors)
        if (isValid) {
            setisSaving(true)
            if (query.id) {
                isSuccess = await updateTask()
            } else {
                isSuccess = await createTask()
            }
            isSuccess ? toast.success("Guardado") : toast.error("Hubo un error al guardar")
            await push("/")
        }
    }

    const createTask = async () => {
        try {
            await fetch(`${process.env.API_URL}/api/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const updateTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const handChange = e => setNewTask({ ...newTask, [e.target.name]: e.target.value })

    const getTask = async () => {
        const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`)
        const task = await res.json()
        setNewTask({
            title: task.title,
            description: task.description
        })
    }

    useEffect(() => {
        if (query.id) getTask()
    }, [])

    return (
        <Container>
            <Grid
                centered
                verticalAlign="middle"
                columns={1}
                style={{ height: "80vh" }}
            >
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>{query.id ? "Update Task" : "Create Task"}</h1>
                        <Form inverted onSubmit={handSubmit}>
                            <Form.Input
                                label="Título"
                                placeholder="Título"
                                name="title" onChange={handChange}
                                error={title ? { content: "Coloca un título", pointing: "below" } : null}
                                value={newTask.title}
                            />
                            <Form.TextArea
                                label="Descripción"
                                placeholder="Descripción"
                                name="description"
                                onChange={handChange}
                                error={description ? { content: "Coloca una descripción", pointing: "below" } : null}
                                value={newTask.description}
                            />
                            <Button circular primary animated loading={isSaving}>
                                {query.id ?
                                    <>
                                        <Button.Content visible>Actualizar</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='check' />
                                        </Button.Content>
                                    </> :
                                    <>
                                        <Button.Content visible>Guardar</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='save outline' />
                                        </Button.Content>
                                    </>
                                }
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>

    )
}

export default TaksFormPage