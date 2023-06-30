import { signIn, signOut, useSession } from "next-auth/react";
import { Form, Header } from "semantic-ui-react";

export default function Login() {
    const { data } = useSession()

    return (
        <Form>
            <Header as="h1">
                {
                    data && data.user ? ('Cerrar sesión') : ('Iniciar sesión')
                }
            </Header>
            <Form.Group widths="equal">
                {
                    data && data.user ?
                        (
                            <>
                                <Header as="h3">
                                    Sesión iniciada como {data.user.name}
                                </Header>
                                <Form.Button onClick={() => signOut()}>
                                    Cerrar sesión
                                </Form.Button>
                            </>
                        ) :
                        (
                            <Form.Button fluid onClick={() => signIn()}>
                                Iniciar sesión
                            </Form.Button>
                        )
                }
            </Form.Group>
        </Form>
    )
}