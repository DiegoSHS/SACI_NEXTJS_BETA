import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { Container, Tab } from "semantic-ui-react"
import DatePicker from "@/components/DatePicker"
import { RTChart } from "@/components/RealTimeChart"

const HomePage = ({ records }) => {
  const { monthAvg, yearAvg } = records

  const minpanes = SaciPanes(yearAvg)

  const panes = [
    {
      menuItem: 'Detallado', render: () => <Tab.Pane attached={false}>{
        <>
          <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={tasks} />
          <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={tasks} />
          <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={tasks} />
          <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={tasks} />
        </>
      }</Tab.Pane>
    },
    { menuItem: 'Promedio mensual', render: () => <Tab.Pane attached={false}>{
      <>
        <SaciChart dataKeyY={'value'} dataKeyX={'monthName'} data={monthAvg} />
        <SaciChart dataKeyY={'value'} dataKeyX={'monthName'} data={monthAvg} />
        <SaciChart dataKeyY={'value'} dataKeyX={'monthName'} data={monthAvg} />
        <SaciChart dataKeyY={'value'} dataKeyX={'monthName'} data={monthAvg} />
      </>
    }</Tab.Pane> },
    {
      menuItem: 'Promedio diario', render: () => <Tab.Pane attached={false}>
        <Tab menu={{
          vertical: true,
          secondary: true,
          pointing: true,
          borderless: true,
          attached: false,
          tabular: false
        }}
          menuPosition='right' panes={minpanes}>
        </Tab>
      </Tab.Pane>
    },
    { menuItem: "Rango de fechas", render: () => <Tab.Pane attached={false}><DatePicker data={tasks} /></Tab.Pane> },
    { menuItem: 'Tiempo real', render: () => <Tab.Pane attached={false}><RTChart interval={1000} /></Tab.Pane> },
    { menuItem: 'Tabla de mediciones', render: () => <Tab.Pane attached={false}>{<SaciTable data={tasks} />}</Tab.Pane> }
  ]

  return (
    <Container style={{ overflowX: "auto", overflowY: "auto" }}>
      <div style={{ width: "1127px", overflow: "auto" }}>
        <Tab
          menu={{
            centered: true,
            inverted: true,
            secondary: true,
            pointing: true,
            compact: true,
            borderless: true,
            attached: false,
            tabular: false
          }} panes={panes} />
      </div>
    </Container>
  )
}

export const getServerSideProps = async ctx => {
  const results = await Promise.allSettled([
    fetch(`${process.env.API_URL}/saci/`),
    fetch(`${process.env.API_URL}/saci/average/`)
  ])
  const [records, averages] = results.map(({value}) => value)
  console.log(records)
  return {
    props: {
      records,
      averages
    }
  }
}

export default HomePage