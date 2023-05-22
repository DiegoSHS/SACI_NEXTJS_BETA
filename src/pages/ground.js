import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { Checkbox, Form, Header, Tab } from "semantic-ui-react"
import { RTChart } from "@/components/RealTimeChart"
import { StoredContext } from "@/context/context"
import { useEffect, useState } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions"
import DatePicker from "@/components/DatePicker"

export const validateFetch = (records, key) => (records === {} || records.saci === undefined || records.saci[key] === undefined)

const HomePage = ({ data }) => {
  const { records, setrecords } = StoredContext()
  const [sensor, setSensor] = useState(0)
  useEffect(() => {
    setrecords({ saci: { ...records.saci, temp_suelo } })
    console.log(records)
  }, [])

  const temp_suelo = validateFetch(records, 'temp_suelo') ? data : records.saci.temp_suelo
  const { logs, daysAvg, monthAvg } = temp_suelo
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
      <Header size="large">Suelo</Header>
      <Form widths="equal">
        <Form.Field inline>
          <Checkbox
            radio
            label='Sensor 1'
            name=''
            value={0}
            checked={sensor === 0}
            onChange={(e, data) => setSensor(data.value)}
          />
          <Checkbox
            radio
            label='Sensor 2'
            name=''
            value={1}
            checked={sensor === 1}
            onChange={(e, data) => setSensor(data.value)}
          />
          <Checkbox
            radio
            label='Sensor 3'
            name=''
            value={2}
            checked={sensor === 2}
            onChange={(e, data) => setSensor(data.value)}
          />
        </Form.Field>
      </Form>
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
  const data = await getDetailedLogs(collection, 'temperatura_suelo')
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

export default HomePage