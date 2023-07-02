import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Card, Form, Header, Image } from "semantic-ui-react";

export default function Login() {
    const { data } = useSession()

    return (
        <>
            <Header size='large'>
                Mi Cuenta
            </Header>
            <Card.Group centered>
                {
                    data && data.user ?
                        (
                            <Card>
                                <Card.Content>
                                    <Image src={data.user.image} size='small' centered circular />
                                </Card.Content>
                                <Card.Content>
                                    <Card.Header>
                                        {data.user.name}
                                    </Card.Header>
                                    <Card.Meta>
                                        {data.user.email}
                                    </Card.Meta>
                                </Card.Content>
                                <Button onClick={() => signOut()}>
                                    Cerrar sesión
                                </Button>
                            </Card>
                        ) :
                        (
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        No se ha iniciado sesión
                                    </Card.Header>
                                </Card.Content>
                                <Button fluid onClick={() => signIn()}>
                                    Iniciar sesión
                                </Button>
                            </Card>
                        )
                }
            </Card.Group>
        </>
    )
}