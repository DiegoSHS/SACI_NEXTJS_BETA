import { Button, Container, Grid, Icon, Menu, Rail } from 'semantic-ui-react'
import Link from "next/link"
import Notify from './Notify'

export const tscolor = {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(10px)'
}

export const SideNavBar = ({ children }) => {
    //const [visible, setVisible] = useState(false)
    //const visib = () => setVisible((preVisible) => !preVisible)

    return (
        <Grid columns={1}>
            <Notify />
            <Menu borderless fixed='top' style={tscolor}>
                <Container style={{ overflow: 'auto' }}>
                    <Menu.Item>
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
                        <Link href='ground'>
                            <Button compact>
                                Suelo
                            </Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='airquality'>
                            <Button compact>
                                Calidad del Aire/Agua
                            </Button>
                        </Link>
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