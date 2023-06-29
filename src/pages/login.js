import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Divider, Form, Header } from "semantic-ui-react";

export default function Login() {
    const { data } = useSession()

    return (
        <Form>
            <Header size="large">
                {
                    data && data.user ? ('Cerrar sesión') : ('Iniciar sesión')
                }
            </Header>
            <Divider />
            {
                data && data.user ?
                    (
                        <Button basic onClick={() => signOut()}>
                            Cerrar sesión
                        </Button>

                    ) :
                    (
                        <Button basic onClick={() => signIn()}>
                            Iniciar sesión
                        </Button>
                    )
            }
        </Form>
    )
}