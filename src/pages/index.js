import { useState } from "react"
import { Button, Embed, Form, Header } from "semantic-ui-react"
const HomePage = () => {
  const [view, setView] = useState(false)
  const activate = () => setView(!view)
  return (
    <Form>
      <Header size="large">Inicio</Header>
      <Header as='h1'>Te damos la bienvenida a SACI</Header>
      <Header as='h3'>Para iniciar puedes ver un video de preview del uso de este sitio web</Header>
      <Button style={{marginBottom:'10px'}} onClick={activate} circular toggle active={view}>Ver</Button>
      {view ? (
        <Embed
          style={{ borderRadius: '10px' }}
          source="youtube"
          id="eNI4CsrwMbY"
          active={true}
          autoplay={true}
          defaultActive={true}
          hd={true}
          aspectRatio="16:9"
          brandedUI
        />
      ) : (<div></div>)}
    </Form>
  )
}

export default HomePage