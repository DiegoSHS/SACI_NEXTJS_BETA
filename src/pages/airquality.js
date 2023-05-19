import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { Tab } from "semantic-ui-react"
import DatePicker from "@/components/DatePicker"
import { RTChart } from "@/components/RealTimeChart"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import axios from "axios"

const HomePage = ({ temp_aire }) => {
  const { records, setrecords } = StoredContext()
  useEffect(() => {
    setrecords({ saci: { temp_aire } })
  }, [setrecords, temp_aire])
  console.log(records)
  const { saci: { temp_aire: { logs, daysAvg, monthAvg } } } = records
  //const { logs, daysAvg, monthAvg } = temp_aire
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
  )
}

export const getServerSideProps = async ctx => {
  const { data } = await axios.get(`${process.env.API_URL}/api/saci/logs/temperatura_aire`)

  return {
    props: {
      temp_aire: data
    }
  }
}

export default HomePage