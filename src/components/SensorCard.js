import { enableSensor } from "@/requests/sensor"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button, Card, Icon, Label, LabelGroup } from "semantic-ui-react"
import io from "socket.io-client"

let socket

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

export const ActuatorCards = ({ data, socket }) => {
    return (
        <Card.Group centered>
            {
                data.map((actuator) => ActuatorCard(actuator, socket))
            }
        </Card.Group>
    )
}

const ActuatorCard = (actuator, socket) => {
    const [updating, setUpdating] = useState(false)
    const { name, description, state, module } = actuator
    const [enable, setEnable] = useState(state)
    
    useEffect(() => {
        socket.on('recieve-newactuator', (newactuator) => {
            if (newactuator.name === name) {
                console.log('actuator updated', newactuator)
                setEnable(newactuator.state)
                toast(`Actuador ${name} ${newactuator.state ? 'encendido' : 'apagado'}`, {
                    icon: newactuator.state ? <Icon color="green" name="power" /> : <Icon color="red" name="power" />,
                    id: 'update-actuator',
                    duration: 1500
                })
            }
        })
    }, [])

    const socketInit = async () => {
        await axios.get('/api/socket')
        socket = io()
        socket.on('recieve-sensor-state', (state) => {
            if (state.name === name) {
                toast(`El sensor ${state.name} ah sido ${state.enable ? 'encendido' : 'apagado'}`,{
                    icon: <Icon color="yellow" name="info" />
                })
                setEnable(state.enable)
            }
        })
        console.log('setup socket')
    }

    useEffect(() => {
        socketInit()
    }, [])

    const emitState = (name, enable) => {
        socket.emit('send-sensor-state', {
            name,
            enable
        })
    }

    const handleUpdate = async () => {
        setUpdating(true)
        emitState(name, !enable)
        toast.promise(
            enableSensor(name, !enable),
            {
                loading: 'Actualizando',
                success: () => {
                    setEnable(!enable)
                    socket.emit('send-newactuator', { name, state: !enable })
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
                    <Button size="mini" loading={updating} active onClick={handleUpdate} color={enable ? 'green' : 'red'}>
                        Estado: {enable ? 'encendido' : 'apagado'}
                    </Button>
                    <Label>Modulo: {module}</Label>
                </LabelGroup>
            </Card.Content>
        </Card>
    )
}