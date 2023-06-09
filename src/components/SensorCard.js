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
    const { name, description, state, module } = actuator
    const [enable, setEnable] = useState(state)
    const [updating, setUpdating] = useState(false)
    const toggleEnable = () => setEnable(!enable)

    const socketInit = async () => {
        await axios.get('/api/socket')
        socket = io()
        socket.on('recieve-sensor-state', (state) => {
            if (state.name === name) {
                toast(`El sensor ${state.name} ah sido ${state.enable ? 'encendido' : 'apagado'}`)
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
                    toggleEnable()
                    setUpdating(false)
                    return (enable ? 'Apagado' : 'Encendido')
                },
                error: 'Error al actualizar'
            }, {
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