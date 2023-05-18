import { Container, Divider, Header, Image, Item, Message } from "semantic-ui-react"
const HomePage = () => {
  return (
    <>
      <Item.Group>
        <Item>
          <Image rounded size='large' src='/img/utim.jpg' />
          <Item.Content>
            <Message>
              <Message.Header>SACI</Message.Header>
              <Message.Content>
                El control de variables ambientales es de vital importancia, ya que al igual que la temperatura, la mejor respuesta del cultivo solo puede lograrse dentro de un cierto rango de humedad y éste depende de la especie cultivada
              </Message.Content>
              <Divider />
              <Message.Content>
                Sistema Automatizado para Cultivos de Invernadero es un sistema enfocado en el monitoreo y control de manera remota con el fin de crear las condiciones más favorables para el cultivo del invernadero que se encuentra dentro de las intalaciones de la Universidad Tecnológica de Izúcar de Matamoros, creando así las mejores condiciones para que el cultivo pueda desarrollarse de manera favorable
              </Message.Content>
            </Message>
          </Item.Content>
        </Item>

        <Item>
          <Image rounded size='large' src='/background.jpg' />
          <Item.Content>
            <Message>
              <Message.Header>Graficas</Message.Header>
              <Message.Content>
                En SACI, entendemos que el monitoreo del cultivo de fresa es fundamental para garantizar una cosecha exitosa y de alta calidad. Las gráficas son una herramienta esencial en este proceso, ya que nos permiten visualizar de manera clara y concisa el estado del cultivo con los datos más actuales. Con las gráficas podemos monitorear factores como la temperatura, la humedad y la luz, lo que nos ayuda a identificar rápidamente cualquier problema que pueda surgir y tomar medidas para corregirlo antes de que cause daños irreparables al cultivo. Además, las gráficas nos permiten hacer un seguimiento del rendimiento del cultivo a lo largo del tiempo, lo que nos permite ajustar nuestras prácticas de cultivo para optimizar la producción y garantizar la rentabilidad a largo plazo. En resumen, en SACI consideramos que las gráficas son una herramienta indispensable en el monitoreo de cultivos de fresa y estamos comprometidos en su uso para mejorar nuestros procesos y garantizar la satisfacción de nuestros clientes
              </Message.Content>
              <Message.List>
              </Message.List>
            </Message>
          </Item.Content>
        </Item>
      </Item.Group>

      <Item >
        <Header inverted as='h2'>Contacto</Header>
        <Message>
          <Message.Content as={'h4'}>
            2441047702
            Reforma 168, Campestre la Paz, 74420 Izúcar de Matamoros, Pue.
            sacidevops@gmail.com
          </Message.Content>
        </Message>
      </Item>
    </>
  )
}

export default HomePage