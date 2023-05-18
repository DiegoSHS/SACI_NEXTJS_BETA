import { createSensor } from "@/requests/sensor"
import { useRouter } from "next/router"
import { useState } from "react"
import { Button, Form, Grid, Icon } from "semantic-ui-react"

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

    const { query, push } = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        const { errors, isValid } = validSensor(newSensor)
        if (Object.values(errors).length) setErrors(errors)
        if (isValid) {
            setisSaving(true)
            if (query.id) {
                isSuccess = await updateSensor(newSensor, query.id)
            } else {
                isSuccess = await createSensor(newSensor)
            }
            isSuccess ? toast.success("Guardado") : toast.error("Hubo un error al guardar")
            await push("/notifications")
        }
    }

    const { name, description, min, max, state, module, pin } = errors
    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Form inverted onSubmit={handleSubmit}>
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
                        <Form.Input
                            label="Pin"
                            placeholder="Pin"
                            name="pin"
                            onChange={handChange}
                            error={pin ? { content: "Coloca un pin", pointing: "below" } : null}
                        />
                        <Button>
                            <Button.Content visible>Guardar
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name='save outline' />
                            </Button.Content>
                        </Button>

                    </Form>
                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}

export default SensorForm