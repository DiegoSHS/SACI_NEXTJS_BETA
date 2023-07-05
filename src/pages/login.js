import { StoredContext } from "@/context/context";
import { signIn, signOut } from "next-auth/react";
import { Button, Card, Header, Image } from "semantic-ui-react";

export default function Login() {
    const { user } = StoredContext()
    return (
        <>
            <Header size='large'>
                Mi Cuenta
            </Header>
            <Card.Group centered>
                {
                    user && user.name ?
                        (
                            <Card>
                                <Card.Content>
                                    <Image alt='user image' src={user.image} size='small' centered circular />
                                </Card.Content>
                                <Card.Content>
                                    <Card.Header>
                                        {user.name}
                                    </Card.Header>
                                    <Card.Meta>
                                        {user.email}
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