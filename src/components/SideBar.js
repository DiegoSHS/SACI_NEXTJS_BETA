import { Button, Container, Grid, Icon, Menu, Dropdown, Label } from 'semantic-ui-react'
import Link from "next/link"
import Notify from './Notify'
import { useState } from 'react'

export const tscolor = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)'
}
const styl = { backgroundImage: 'url(/body.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backdropFilter: 'blur(10px)' }

export const SideNavBar = ({ children }) => {
    const [visible, setvisible] = useState({ suelo: false, aire: false })
    const [config, setConfig] = useState(false)
    const visibleConfig = () => setConfig(!config)
    const visibleSuelo = () => setvisible({ ...visible, suelo: !visible.suelo, aire: false })
    const visibleAire = () => setvisible({ ...visible, aire: !visible.aire, suelo: false })
    return (
        <Grid columns={1}>
            <Notify />
            <Menu borderless fixed='top' style={{ ...tscolor, position: 'sticky' }}>
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
                        <Button.Group >
                            <Button basic compact toggle active={visible.suelo} onClick={visibleSuelo}>
                                Suelo
                            </Button>
                        </Button.Group>
                        {visible.suelo ? (
                            <Button.Group compact>
                                <Button compact>
                                    <Link href='/ground'>
                                        Temperatura
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/ground/humidity'>
                                        Humedad
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/ground/ph'>
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
                                    <Link href='/airquality'>
                                        Temperatura
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/airquality/humidity'>
                                        Humedad
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/airquality/radiation'>
                                        Radiación solar
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/airquality/luminic'>
                                        Luminosidad
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/airquality/tds'>
                                        TDS en Agua
                                    </Link>
                                </Button>
                                <Button compact>
                                    <Link href='/airquality/co2'>
                                        CO2 en ambiente
                                    </Link>
                                </Button>
                            </Button.Group>
                        ) : (<div></div>)
                        }
                    </Menu.Item>
                    {
                        !(visible.aire || visible.suelo) ? (
                            <>
                                <Menu.Item>
                                    <Link href="/tasks">
                                        <Button compact>
                                            Notificaciones
                                        </Button>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/manage'>
                                        <Button compact>
                                            Control de invernadero
                                        </Button>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/sensor'>
                                        <Button compact>
                                            Sensores
                                        </Button>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href='/about'>
                                        <Button compact>
                                            Acerca de
                                        </Button>
                                    </Link>
                                </Menu.Item>
                            </>
                        ) : (<div></div>)
                    }
                </Container>
            </Menu>
            <Container fluid style={{ marginTop: "5vh", marginBottom: "5vh" }} >
                <Grid container stretched inverted centered columns={1}>
                    <Grid.Column textAlign="center" verticalAlign='middle'>
                        {children}
                    </Grid.Column>
                </Grid>
            </Container>
        </Grid>
    )
}

export default SideNavBar