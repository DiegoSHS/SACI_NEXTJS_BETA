import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Divider, Header, Icon } from "semantic-ui-react";

export default function Login() {
    const { data } = useSession()

    return (
        <>
            <Header size="large">
                {
                    data && data.user ? ('Cerrar sesión') : ('Iniciar sesión')
                }
            </Header>
            <Divider />
            {
                data && data.user ?
                    (
                        <Button basic onClick={()=>signOut()}>
                            Cerrar sesión
                        </Button>
                        
                    ) :
                    (
                        <Button basic onClick={()=>signIn()}>
                            <Icon color="blue" name="fi fi-brands-google" />Google
                        </Button>
                    )
            }
        </>
    )
}