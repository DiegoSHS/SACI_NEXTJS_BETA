import { enableSensor } from "@/requests/sensor"
import { formatter } from "@/utils/dateformat"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Card, Icon, Label, LabelGroup } from "semantic-ui-react"

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

export const ActuatorCards = ({ data, socket, user }) => {
    return (
        <Card.Group centered>
            {
                data.map((actuator) => ActuatorCard(actuator, socket, user))
            }
        </Card.Group>
    )
}

const ActuatorCard = (actuator, socket, user) => {
    const { name, description, state, module } = actuator,
        [enable, setEnable] = useState(state),
        [updating, setUpdating] = useState(false)

    useEffect(() => {
        socket.on('recieve-newactuator', (newactuator) => {
            if (newactuator.name === name) {
                setEnable(newactuator.state)
                toast(`${newactuator.user?.name || 'Un usuario móvil'} ${newactuator.state ? 'encendió' : 'apagó'} el sensor ${name} `, {
                    icon: newactuator.state ? <Icon color="green" name="power" /> : <Icon color="red" name="power" />,
                    id: 'update-actuator',
                    duration: 1500
                })
            }
        })
    }, [])


    const handleClick = async () => {
        setUpdating(true)
        toast.promise(
            enableSensor(name, !enable),
            {
                loading: 'Actualizando',
                success: () => {
                    setEnable(!enable)
                    socket.emit('send-newactuator', { name, state: !enable, user })
                    socket.emit('send-notification', {
                        title: 'Actuador actualizado',
                        description: `${user.name} ${!enable ? 'encendió' : 'apagó'} el actuador ${name}`,
                        date: formatter()
                    })
                    setUpdating(false)
                    return (enable ? 'Apagado' : 'Encendido')
                },
                error: () => {
                    setUpdating(false)
                    return 'Error al actualizar'
                }
            },
            {
                id: 'enable-state',
                success: {
                    duration: 1500,
                    icon: enable ? <Icon color="red" name="power" /> : <Icon color="green" name="power" />,
                }
            }
        )
    }


    return (
        <Card key={name}>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{description}</Card.Description>
                <LabelGroup>
                    <Button size="mini" loading={updating} active onClick={handleClick} color={enable ? 'green' : 'red'}>
                        Estado: {enable ? 'encendido' : 'apagado'}
                    </Button>
                    <Label>Modulo: {module}</Label>
                </LabelGroup>
            </Card.Content>
        </Card>
    )
}