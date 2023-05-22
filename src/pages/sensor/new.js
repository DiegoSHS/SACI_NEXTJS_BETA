import { createSensor, getSensor, updateSensor } from "@/requests/sensor"
import { validSensorForm } from "@/validation/forms"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Form, Icon } from "semantic-ui-react"

const SensorForm = () => {
    const [newSensor, setNewSensor] = useState({
        name: '',
        description: '',
        min: '',
        max: '',
        state: '',
        module: '',
        pin: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        min: '',
        max: '',
        state: '',
        module: '',
        pin: ''
    })

    const [isSaving, setisSaving] = useState(false)

    const { name, description, min, max, state, module, pin } = errors

    const { query, push } = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        const { errors, isValid } = validSensorForm(newSensor)
        let isSuccess = false
        if (Object.values(errors).length) setErrors(errors)
        if (isValid) {
            setisSaving(true)
            if (query.id) {
                isSuccess = await updateSensor(newSensor, query.id)
            } else {
                isSuccess = await createSensor(newSensor)
            }
            isSuccess ? toast.success("Guardado") : toast.error("Hubo un error al guardar")
            await push("/sensor")
        }
    }

    const handChange = e => setNewSensor({ ...newSensor, [e.target.name]: e.target.value })

    useEffect(() => {
        if (query.id) getSensor(query.id, setNewSensor)
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <h1>{query.id ? "Actualizar sensor" : "Añadir sensor"}</h1>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Nombre"
                    placeholder="Nombre"
                    name="name"
                    onChange={handChange}
                    error={name ? { content: "Coloca un nombre", pointing: "below" } : null}
                />
                <Form.Input
                    label="Descripción"
                    placeholder="Descripción"
                    name="description"
                    onChange={handChange}
                    error={description ? { content: "Coloca una descripción", pointing: "below" } : null}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Mínimo"
                    placeholder="Mínimo"
                    name="min"
                    onChange={handChange}
                    error={min ? { content: "Coloca un mínimo", pointing: "below" } : null}
                />
                <Form.Input
                    label="Máximo"
                    placeholder="Máximo"
                    name="max"
                    onChange={handChange}
                    error={max ? { content: "Coloca un máximo", pointing: "below" } : null}
                />
                <Form.Input
                    label="Pin"
                    placeholder="Pin"
                    name="pin"
                    onChange={handChange}
                    error={pin ? { content: "Coloca un pin", pointing: "below" } : null}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label="Estado"
                    placeholder="Estado"
                    name="state"
                    onChange={handChange}
                    error={state ? { content: "Coloca un estado", pointing: "below" } : null}
                />
                <Form.Input
                    label="Módulo"
                    placeholder="Módulo"
                    name="module"
                    onChange={handChange}
                    error={module ? { content: "Coloca un módulo", pointing: "below" } : null}
                />
            </Form.Group>

            <Button circular animated loading={isSaving}>
                {query.id ?
                    <>
                        <Button.Content visible>Actualizar</Button.Content>
                        <Button.Content hidden>
                            <Icon name="edit" />
                        </Button.Content>
                    </> :
                    <>
                        <Button.Content visible>Guardar</Button.Content>
                        <Button.Content hidden>
                            <Icon name="save" />
                        </Button.Content>
                    </>
                }
            </Button>

        </Form>
    )
}

export default SensorForm