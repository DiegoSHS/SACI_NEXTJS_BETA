import { createSensor, getSensor, updateSensor } from "@/requests/sensor"
import { validSensorForm } from "@/validation/forms"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Breadcrumb, Button, Checkbox, Divider, Form, Header, Icon, Label } from "semantic-ui-react"

const SensorForm = () => {
    const [sensorState, setSensorState] = useState(false)
    const toggleSensorState = () => setSensorState(!sensorState)

    const [newSensor, setNewSensor] = useState({
        name: '',
        description: '',
        min: 0,
        max: 0,
        state: sensorState,
        module: '',
        pin: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        min: '',
        max: '',
        module: '',
        pin: ''
    })

    const [isSaving, setisSaving] = useState(false)

    const { name, description, min, max, module, pin } = errors

    const { query, push } = useRouter()

    const handleSubmit = async e => {
        e.preventDefault()
        setNewSensor({ ...newSensor, min: parseInt(newSensor.min), max: parseInt(newSensor.max) })
        const { errors, isValid } = validSensorForm(newSensor)
        if (Object.values(errors).length) setErrors(errors)
        if (isValid) {
            toast.promise(
                query.id ? updateSensor(newSensor, query.id) : createSensor(newSensor),
                {
                    loading: "Guardando",
                    success: () => {
                        setisSaving(false)
                        return "Guardado"
                    },
                    error: "Error al guardar"
                }
            )
            await push("/sensor")
        }
    }

    const handChange = e => setNewSensor({ ...newSensor, [e.target.name]: e.target.value })

    useEffect(() => {
        const fetchSensor = async () => {
            const sensor = await getSensor(query.id)
            setNewSensor(sensor)
        }
        if (query.id) fetchSensor()
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
            <Header size="large">{query.id ? "Actualizar sensor" : "Añadir sensor"}</Header>
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
                    type="number"
                    label="Mínimo"
                    placeholder="Mínimo"
                    name="min"
                    onChange={handChange}
                    error={min ? { content: "Coloca un mínimo", pointing: "below" } : null}
                />
                <Form.Input
                    type="number"
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
                <Form.Input
                    label="Módulo"
                    placeholder="Módulo"
                    name="module"
                    onChange={handChange}
                    error={module ? { content: "Coloca un módulo", pointing: "below" } : null}
                />
            </Form.Group>
            <Form.Group inline widths='equal'>
                <Label color={sensorState ? 'green' : 'red'} content='Estado inicial del sensor' />
                <Form.Group inline>
                    <Form.Radio inline radio checked={!sensorState} onClick={toggleSensorState} label="Apagado" name="state" />
                    <Form.Radio inline radio checked={sensorState} onClick={toggleSensorState} label="Encendido" name="state" />
                </Form.Group>
            </Form.Group>
            <Button circular animated positive loading={isSaving}>
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