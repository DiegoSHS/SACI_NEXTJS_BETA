import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { RTChart } from "@/components/RealTimeChart"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { validateFetch } from "./ground"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions"
import DatePicker from "@/components/DatePicker"

const HomePage = ({ data }) => {
  const { records, setrecords } = StoredContext()
  useEffect(() => {
    setrecords({ saci: { ...records.saci, temp_aire } })
    console.log(records)
  }, [])

  const temp_aire = validateFetch(records, 'temp_aire') ? data : records.saci.temp_aire
  const { logs, daysAvg, monthAvg } = temp_aire
  const minpanes = SaciPanes(daysAvg)
  const panes = [
    {
      menuItem: 'Detallado', render: () => <Tab.Pane attached={false}>{
        <>
          <SaciChart dataKeyY={'value'} dataKeyX={'date'} data={logs} />
        </>
      }</Tab.Pane>
    },
    {
      menuItem: 'Promedio mensual', render: () => <Tab.Pane attached={false}>{
        <>
          <SaciChart dataKeyY={'value'} dataKeyX={'monthName'} data={monthAvg} />
        </>
      }</Tab.Pane>
    },
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
    { menuItem: "Rango de fechas", render: () => <Tab.Pane attached={false}><DatePicker data={logs} /></Tab.Pane> },
    { menuItem: 'Tiempo real', render: () => <Tab.Pane attached={false}><RTChart id={'temperatura_aire'} interval={1000} /></Tab.Pane> },
    { menuItem: 'Tabla de mediciones', render: () => <Tab.Pane attached={false}>{<SaciTable data={logs} />}</Tab.Pane> }
  ]

  return (
    <>
      <Header size="large">Aire</Header>
      <div style={{ overflow: "auto" }}>
        <div style={{ width: "1127px", overflow: "auto" }}>
          <Tab
            menu={{
              centered: true,
              secondary: true,
              pointing: true,
              compact: true,
              borderless: true,
              attached: false,
              tabular: false
            }} panes={panes} />
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ctx => {
  const { collection } = await connex(process.env.SDB, 'logs')
  const data = await getDetailedLogs(collection, 'temperatura_aire')
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

export default HomePage