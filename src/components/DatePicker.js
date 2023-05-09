import { formatter } from '@/utils/dateformat'
import { useState } from 'react'
import ReactDatePicker from "react-datepicker"
import { Button, Grid, Header, Icon, Label, Modal } from 'semantic-ui-react'
import { SaciChart } from './SaciChart'

const DatePicker = ({ data }) => {
    if (data.length === 0) {
        return (
            <Grid centered verticalAlign="middle" columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <h1>Sin datos existentes</h1>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const [regs, setRegs] = useState([])
    const opened = () => setConfirm(true)
    const closed = () => setConfirm(false)
    const [confirm, setConfirm] = useState(false)
    const handleChange = (dates) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        const finalRegs = data.filter(({ createdAt }) => {
            const initi = new Date(formatter(start).split(' ')[0])
            console.log(initi)
            const ended = new Date(formatter(end).split(' ')[0])
            const actual = new Date(createdAt.split(' ')[0])
            return (actual > initi && actual < ended)
        })
        setRegs(finalRegs)
    }

    return (
        <>
            <Label basic style={{ border: "none" }}>Selecciona un rango</Label>
            <Modal
                dimmer="blurring"
                basic
                onClose={closed}
                open={confirm}
                size='small'
                trigger={
                    <Button animated="vertical" circular color='blue' onClick={opened}>
                        <Button.Content visible>{`${formatter(startDate)} - ${formatter(endDate) || "no seleccionado"}`}</Button.Content>
                        <Button.Content hidden>
                            <Icon name="calendar alternate outline"></Icon>
                        </Button.Content>
                    </Button>
                }
            >
                <Grid centered verticalAlign="middle" stackable={true} columns={1}>
                    <Grid.Row>
                        <Header icon>
                            <Icon color='blue' name='calendar alternate' />
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        Un click para seleccionar fecha de inicio y otro click para seleciconar fecha de fin
                    </Grid.Row>
                    <Grid.Row>
                        <ReactDatePicker
                            selected={startDate}
                            onChange={handleChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                        />
                    </Grid.Row>
                </Grid>
                <Modal.Actions>
                    <Button basic circular color='red' inverted onClick={closed}>
                        <Icon name='remove' /> Cerrar
                    </Button>
                </Modal.Actions>
            </Modal>
            <SaciChart dataKeyX={value} dataKeyY={day} data={regs} />
        </>
    )
}

export default DatePicker