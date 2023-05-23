import { Button, Container, Grid, Icon, Menu, Dropdown } from 'semantic-ui-react'
import Link from "next/link"
import Notify from './Notify'
import { useState } from 'react'

export const tscolor = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)'
}

export const SideNavBar = ({ children }) => {
    const [visible, setvisible] = useState({ suelo: false, aire: false })
    const visibleSuelo = () => setvisible({ ...visible, suelo: !visible.suelo, aire: false })
    const visibleAire = () => setvisible({ ...visible, aire: !visible.aire, suelo: false })
    return (
        <Grid columns={1}>
            <Notify />
            <Menu borderless fixed='top' style={tscolor}>
                <Container style={{ overflowX: 'auto' }}>
                    <Menu.Item >
                        <Link href="/">
                            <Button compact positive animated>
                                <Button.Content visible>
                                    <Icon name="home" />
                                </Button.Content>
                                <Button.Content hidden>
                                    Inicio
                                </Button.Content>
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href="tasks">
                            <Button compact>
                                Notificaciones
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group >
                            <Button basic compact toggle active={visible.suelo} onClick={visibleSuelo}>
                                Suelo
                            </Button>
                        </Button.Group>
                        {visible.suelo ? (
                            <Button.Group compact>
                                <Button compact>
                                    <Link href='ground'>
                                        Temperatura
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='ground/humidity'>
                                        Humedad
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='ground/ph'>
                                        Ph
                                    </Link>
                                </Button>
                            </Button.Group>
                        ) : (<div></div>)
                        }
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group>
                            <Button basic compact toggle active={visible.aire} onClick={visibleAire}>
                                Calidad del Aire/Agua
                            </Button>
                        </Button.Group>
                        {visible.aire ? (
                            <Button.Group compact>
                                <Button compact>
                                    <Link href='airquality'>
                                        Temperatura
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='airquality/humidity'>
                                        Humedad
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='airquality/radiation'>
                                        radiacion solar
                                    </Link>
                                </Button>
                            </Button.Group>
                        ) : (<div></div>)
                        }
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='manage'>
                            <Button compact>
                                Control de invernadero
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='sensor'>
                            <Button compact>
                                Sensores
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Link href='tasks/new'>
                                <Button icon positive labelPosition="right" size="tiny">
                                    Nueva tarea
                                    <Icon name="plus" />
                                </Button>
                            </Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Container fluid style={{ marginTop: "12vh" }}>
                <Grid container stretched inverted centered columns={1} style={{ height: "88vh" }}>
                    <Grid.Column textAlign="center" verticalAlign='middle'>
                        {children}
                    </Grid.Column>
                </Grid>
            </Container>
        </Grid>
    )
}

export default SideNavBar