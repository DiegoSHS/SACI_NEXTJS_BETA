import axios from "axios"
import { Divider, Form, Header, Progress } from "semantic-ui-react"
const HomePage = ({ summary }) => {
  const { aire, suelo, agua } = summary
  
  return (
    <Form>
      <Header size='large'>Suelo</Header>
      <Form.Group widths='equal'>
        <Form.Button basic circular fluid icon={{ name: 'fi fi-rr-thermometer-half', color: 'red' }} size="big" content={`Temperatura: ${suelo.tempAvg} ºC`} label='Temperatura del suelo' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-leaf', color: 'green' }} size="big" content={`Ph: ${suelo.phAvg} Unidades`} label='Nivel de Ph' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'blue' }} size="big" content={`Humedad: ${suelo.humAvg}%`} label='Humedad del suelo' labelPosition="left" />
      </Form.Group>
      <Divider />
      <Header size='large'>Ambiente</Header>
      <Form.Group widths='equal'>
        <Form.Button basic circular fluid icon={{ name: 'fi fi-rr-summer', color: 'red' }} size="big" content={`Temperatura: ${aire.tempAire} ºC`} label='Temperatura del aire' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-bulb', color: 'yellow' }} size="big" content={`Luminosidad: ${aire.lum}`} label='Luminosidad del ambiente' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'blue' }} size="big" content={`Humedad: ${aire.humAire}%`} label='Humedad del aire' labelPosition="left" />
      </Form.Group>
      <Divider />
      <Header size='large'>Otros</Header>
      <Form.Group widths='equal'>
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-cloud', color: 'black' }} size="big" content={`CO2: ${aire.co2} ppm`} label='Cantidad de co2 en el ambiente' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-sun', color: 'yellow' }} size="big" content={`Rad: ${aire.radiation} W/m²`} label='Radiación solar en el ambiente' labelPosition="left" />
        <Form.Button basic circular fluid icon={{ name: 'fi fi-sr-humidity', color: 'brown' }} size="big" content={`TDS: ${agua.tds} ppm`} label='Total de sólidos en agua' labelPosition="left" />
      </Form.Group>
      <Divider />
      <Header size='medium'>Agua disponible</Header>
      <Progress progress color="blue" percent={(agua.nivel < 100 && agua.nivel > 0) ? agua.nivel : 100}/>
    </Form>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(process.env.API_URL + 'api/saci/logs/summary')

  return {
    props: {
      summary: data
    }
  }
}

export default HomePage