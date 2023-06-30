import { signIn, signOut, useSession } from "next-auth/react";
import { Card, Form, Header } from "semantic-ui-react";

export default function Login() {
    const { data } = useSession()

    return (
        <>
            <Header as="h1">
                {
                    data && data.user ? ('Cerrar sesión') : ('Iniciar sesión')
                }
            </Header>
            <Card.Group centered>
                {
                    data && data.user ?
                        (
                            <Card>
                                <Image circular src={data.user.image} size='small' />
                                <Card.Content>
                                    <Card.Header>
                                        {data.user.name}
                                    </Card.Header>
                                    <Card.Meta>
                                        {data.user.email}
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button onClick={() => signOut()}>
                                        Cerrar sesión
                                    </Button>
                                </Card.Content>
                            </Card>
                        ) :
                        (
                            <Form.Button fluid onClick={() => signIn()}>
                                Iniciar sesión
                            </Form.Button>
                        )
                }
            </Card.Group>
        </>
    )
}