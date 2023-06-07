import axios from "axios"
import { useState } from "react"
import { Button, Divider, Embed, Form, Header, Icon, Label, Statistic } from "semantic-ui-react"
const HomePage = ({ summary }) => {
  const [view, setView] = useState(false)
  const activate = () => setView(!view)
  const { aire, suelo } = summary
  console.log(aire)
  return (
    <Form>
      <Header as='h1'>Suelo</Header>
      <Form.Group widths='equal'>
        <Form.Button circular fluid icon={{ name: 'fi fi-rr-thermometer-half',className:'fi-rr-thermometer', color: 'red' }} size="big" content={`Temperatura: ${suelo.tempAvg} ºC`} label='Temperatura del suelo' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-leaf', color: 'green' }} size="big" content={`Ph: ${suelo.phAvg} Unidades`} label='Nivel de Ph' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'blue' }} size="big" content={`Humedad: ${suelo.humAvg}%`} label='Humedad del suelo' labelPosition="left" />
      </Form.Group>
      <Divider />
      <Header as='h1'>Ambiente</Header>
      <Form.Group widths='equal'>
        <Form.Button circular fluid icon={{ name: 'fi fi-rr-summer', color: 'red' }} size="big" content={`Temperatura: ${aire.tempAire} ºC`} label='Temperatura del aire' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-bulb', color: 'yellow' }} size="big" content={`Luminosidad: ${aire.lum}`} label='Luminosidad del ambiente' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'blue' }} size="big" content={`Humedad: ${aire.humAire}%`} label='Humedad del aire' labelPosition="left" />
      </Form.Group>
      <Divider />
      <Header as='h1'>Otros</Header>
      <Form.Group widths='equal'>
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-cloud', color: 'black' }} size="big" content={`CO2: ${aire.co2} ppm`} label='Cantidad de co2 en el ambiente' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-sun', color: 'yellow' }} size="big" content={`Rad: ${aire.radiation} W/m²`} label='Radiación solar en el ambiente' labelPosition="left" />
        <Form.Button circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'brown' }} size="big" content={`TDS: ${aire.tds} ppm`} label='Total de sólidos en agua' labelPosition="left" />
      </Form.Group>
    </Form>
  )
  /*
  return (
    <Form>
      <Header size="large">Inicio</Header>
      <Header as='h1'>Bienvenido</Header>
      <Header as='h3'>Para iniciar puedes ver un video de preview del uso de este sitio web</Header>
      <Button style={{ marginBottom: '10px' }} onClick={activate} circular toggle active={view}>Ver</Button>
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
  */
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(process.env.API_URL+'api/saci/logs/summary')
  return {
    props: {
      summary: data
    }
  }
}

export default HomePage