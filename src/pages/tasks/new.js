import { createTask, getTask, updateTask } from "@/requests/task"
import { validTaskForm } from "@/validation/forms"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Form, Header, Icon } from "semantic-ui-react"

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

    const handSubmit = async e => {
        e.preventDefault()
        let { errorss, isValid } = validTaskForm(newTask)
        let isSuccess = false
        if (Object.values(errorss).length) setErrors(errors)
        if (isValid) {
            setisSaving(true)
            if (query.id) {
                isSuccess = await updateTask(newTask, query.id)
            } else {
                isSuccess = await createTask(newTask)
            }
            isSuccess ? toast.success("Guardado") : toast.error("Hubo un error al guardar")
            await push("/tasks")
        }
    }

    const handChange = e => setNewTask({ ...newTask, [e.target.name]: e.target.value })

    useEffect(() => {
        if (query.id) getTask(query.id, setNewTask)
    }, [])

    return (
        <Form onSubmit={handSubmit}>
            <Header size="large">{query.id ? "Update Task" : "Create Task"}</Header>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Título"
                    placeholder="Título"
                    name="title" onChange={handChange}
                    error={title ? { content: "Coloca un título", pointing: "below" } : null}
                    value={newTask.title}
                />
                <Form.Input
                    label="Descripción"
                    placeholder="Descripción"
                    name="description"
                    onChange={handChange}
                    error={description ? { content: "Coloca una descripción", pointing: "below" } : null}
                    value={newTask.description}
                />
            </Form.Group>
            <Button circular positive animated loading={isSaving}>
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
                            <Icon name='save' />
                        </Button.Content>
                    </>
                }
            </Button>
        </Form>
    )
}

export default TaksFormPage