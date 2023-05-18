import { useRouter } from "next/router"
import { Button, Container, Grid, Icon, Menu } from 'semantic-ui-react'
import Link from "next/link"
import Notify from './Notify'

export const SideNavBar = ({ children }) => {
    //const [visible, setVisible] = useState(false)
    //const visib = () => setVisible((preVisible) => !preVisible)
    const router = useRouter()

    return (
        <Grid columns={1}>
            <Notify />
            <Menu borderless fixed='top'>
                <Container style={{ overflow: 'auto' }}>
                    <Menu.Item>
                        <Link href="/">
                            <Button positive animated>
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
                        <Button compact onClick={() => router.push('/notifications')}>
                            Notificaciones
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact>
                            Suelo
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact onClick={() => router.push('/airquality')}>
                            Calidad del Aire/Agua
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact>
                            Control de invernadero
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button compact>
                            Sensores
                        </Button>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button icon positive labelPosition="right" size="mini" onClick={() => router.push('/tasks/new')}>Nueva tarea<Icon name="plus"></Icon></Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            <Container fluid style={{ marginTop: "12vh" }}>
                <Grid inverted container centered verticalAlign="middle" columns={1} style={{ height: "88vh" }}>
                    <Grid.Column textAlign="center">
                        {children}
                    </Grid.Column>
                </Grid>
            </Container>
        </Grid>
    )
}

export default SideNavBar