import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { Tab } from "semantic-ui-react"
import DatePicker from "@/components/DatePicker"
import { RTChart } from "@/components/RealTimeChart"
import { StoredContext } from "@/context/context"

const HomePage = ({ records }) => {
  const { logs, daysAvg, monthAvg } = records
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

  const response = await fetch(`${process.env.API_URL}/api/saci/logs/temperatura_aire`)
  const records = await response.json()

  return {
    props: {
      records
    }
  }
}

export default HomePage