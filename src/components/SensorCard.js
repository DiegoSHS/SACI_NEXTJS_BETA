import { enableSensor } from "@/requests/sensor"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Card, Label, LabelGroup } from "semantic-ui-react"

export const SensorCards = ({ data }) => {
    return (
        <Card.Group centered>
            {
                data.map(SensorCard)
            }
        </Card.Group>
    )
}

const SensorCard = (sensor) => {
    const { _id, name, description, min, max, state, module, pin } = sensor
    return (
        <Card key={_id}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
                <LabelGroup>
                    <Label>Estado: {state ? 'encendido' : 'apagado'}</Label>
                    <Label>Modulo: {module}</Label>
                </LabelGroup>
                <LabelGroup>
                    <Label >Pin: {pin}</Label>
                    <Label color="teal">Min: {min}</Label>
                    <Label color="olive">Max: {max}</Label>
                </LabelGroup>
            </Card.Content>
        </Card>
    )
}

export const ActuatorCards = ({ data }) => {
    return (
        <Card.Group centered>
            {
                data.map(ActuatorCard)
            }
        </Card.Group>
    )
}

const ActuatorCard = (actuator) => {
    const { id, name, description, state, module } = actuator
    const [enable, setEnable] = useState(state)
    const [updating, setUpdating] = useState(false)
    const toggleUpdate = () => setUpdating(!updating)

    const handleUpdate = async () => {
        toggleUpdate()
        toast.promise(enableSensor(id, !enable), {
            loading: "Actualizando",
            success: "Actualizado",
            error: "Error al actualizar"
        })
        toggleUpdate()
        setEnable(!enable)
    }


    return (
        <Card key={id}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
                <LabelGroup>
                    <Button size="mini" loading={updating} active onClick={handleUpdate} color={enable ? 'green' : 'red'}>
                        Estado: {enable ? 'encendido' : 'apagado'}
                    </Button>
                    <Label>Modulo: {module}</Label>
                </LabelGroup>
            </Card.Content>
        </Card>
    )
}