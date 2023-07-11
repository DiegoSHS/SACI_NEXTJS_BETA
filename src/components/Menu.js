import Link from "next/link"
import { Button, Container, Icon, Image, Menu, Popup } from "semantic-ui-react"
import { useEffect, useState } from 'react'
import { getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { StoredContext } from "@/context/context"
import { TasksCards } from "./TaskCard"

const SesionButton = ({ user }) => {
    if (!user.name) {
        return (
            <Button basic compact content='Iniciar sesión' onClick={signIn} icon={{ name: 'fi-rr-user-add' }} />
        )
    }
    return (
        <Popup basic on='click' wide trigger={
            <Image src={user.image} alt="user" size='mini' circular />
        }>
            <Link href='/login'>
                <Image src={user.image} alt="user" size='mini' circular />
            </Link>
            <p>{user.name}</p>
            <Button basic compact content='Cerrar sesión' onClick={signOut} icon={{ name: 'fi-rr-sign-out-alt' }} />
        </Popup>
    )
}

const NotificationButton = () => {
    return (
        <Popup basic on='click' wide trigger={
            <Icon name="fi-rr-bells" />
        }>
            <TasksCards />
        </Popup>
    )
}

const MenuItems = ({ children }) => {
    const [visible, setvisible] = useState({ suelo: false, aire: false }),
        visibleSuelo = () => setvisible({ ...visible, suelo: !visible.suelo, aire: false }),
        visibleAire = () => setvisible({ ...visible, aire: !visible.aire, suelo: false })
    return (
        <>
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
                <Button basic compact toggle active={visible.suelo} onClick={visibleSuelo}>
                    Suelo
                </Button>
            </Menu.Item>
            {visible.suelo ? (
                <>
                    <Menu.Item>
                        <Link href='/ground'>
                            <Popup content='Temperatura' basic trigger={<Icon name='fi-rr-thermometer-half' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/ground/humidity'>
                            <Popup content='Humedad' basic trigger={<Icon name='fi-rr-raindrops' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/ground/ph'>
                            <Popup content='Nivel de Ph' basic trigger={<Icon name='fi-rr-leaf' />} />
                        </Link>
                    </Menu.Item>
                </>
            ) : (<></>)
            }
            <Menu.Item>
                <Button basic compact toggle active={visible.aire} onClick={visibleAire}>
                    Calidad del Aire/Agua
                </Button>
            </Menu.Item>
            {visible.aire ? (
                <><Menu.Item compact>
                    <Link href='/airquality'>
                        <Popup content='Temperatura' basic trigger={<Icon name='fi-rr-thermometer-half' />} />
                    </Link>
                </Menu.Item>
                    <Menu.Item compact>
                        <Link href='/airquality/humidity'>
                            <Popup content='Humedad' basic trigger={<Icon name='fi-rr-raindrops' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/airquality/radiation'>
                            <Popup content='Radiación solar' basic trigger={<Icon name='fi-rr-sun' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/airquality/luminic'>
                            <Popup content='Luminosidad' basic trigger={<Icon name='fi-rr-cloud-sun' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/airquality/tds'>
                            <Popup content='TDS en Agua' basic trigger={<Icon name='fi-rr-humidity' />} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href='/airquality/co2'>
                            <Popup content='CO2 en ambiente' basic trigger={<Icon name='fi-rr-cloud' />} />
                        </Link>
                    </Menu.Item></>
            ) : (<></>)
            }
            <Menu.Item position='right'>
                <Link href="/tasks">
                    <Popup content='Notificaciones' basic trigger={<Icon name="fi-rr-bells" />} />
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/manage'>
                    <Popup content='Control de invernadero' basic trigger={<Icon name='fi-rr-settings-sliders' />} />
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/sensor'>
                    <Popup content='Sensores' basic trigger={<Icon name='fi-rr-puzzle-alt' />} />
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link href='/about'>
                    <Popup content='Acerca de' basic trigger={<Icon name="fi-rr-info" />} />
                </Link>
            </Menu.Item>
            <Menu.Item>
                {children}
            </Menu.Item>
        </>
    )
}

export const NavMenu = () => {
    const router = useRouter(),
        { user, setUser } = StoredContext()
    useEffect(() => {
        const sesionInit = async () => {
            const session = await getSession()
            if (!session) {
                router.push('/login')
                return
            }
            setUser(session.user)
        }
        if (window.location.hostname === 'localhost') return
        sesionInit()
    }, [])

    return (
        <Menu borderless fixed='top' style={{ position: 'sticky' }}>
            <Container fluid style={{ overflowX: 'auto' }}>
                {
                    user.name ? (
                        <MenuItems>
                            <SesionButton user={user} />
                        </MenuItems>
                    ) : (
                        <Menu.Item position="right">
                            <SesionButton user={user} />
                        </Menu.Item>
                    )
                }
            </Container>
        </Menu>
    )
}