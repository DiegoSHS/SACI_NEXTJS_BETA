import { months } from "@/utils/sortRegisters"
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Grid, Tab, Table } from "semantic-ui-react"
import { NoData } from "./NoTasks"

export const SaciChart = ({ data, dataKeyY, dataKeyX }) => {
  if (data === undefined || data.length === 0 ) {
    return (
      <NoData />
    )
  }
  return (
    <ResponsiveContainer width="100%" aspect={3} height="100%">
      <LineChart style={{ backgroundColor: "white", borderRadius: "5px", margin: "1px" }}
        margin={{
          top: 15,
          right: 15,
          left: 0,
          bottom: 15,
        }}
        data={data}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis type="category" allowDuplicatedCategory={true} dataKey={dataKeyX} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={12}
          interval={0}
          minTickGap={0}
        />
        <Tooltip />
        <Legend />
        <Line animationDuration={250} strokeWidth={1} type="monotone" dataKey={dataKeyY} stroke="black" />
        <Brush height={20} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const SaciPanes = (data) => {
  if (data === undefined || data.length === 0) {
    return ({ menuItem: 'No hay datos', render: () => <Tab.Pane attached={false}><NoData /></Tab.Pane> })
  }
  const panes = data.map((arr, i) => {
    return ({ menuItem: months[i], render: () => <Tab.Pane attached={false}>{<SaciChart dataKeyY={'value'} dataKeyX={'day'} data={arr} />}</Tab.Pane> })
  })
  return panes
}

export const SaciTable = ({ data }) => {
  if (data === undefined || data.length === 0) {
    return (
      <NoData />
    )
  }
  const firts = data[0]
  const heads = Object.keys(firts)
  const headerr = heads.map(h => <Table.HeaderCell collapsing>{h}</Table.HeaderCell>)
  const body = data.map(r => {
    const cells = Object.values(r)
    const roww = cells.map(c => <Table.Cell collapsing>{c}</Table.Cell>)
    return <Table.Row>{roww}</Table.Row>
  })

  return (
    <div>
      <Table unstackable fixed compact='very'>
        <Table.Header>
          <Table.Row>
            {headerr}
          </Table.Row>
        </Table.Header>
      </Table>
      <div style={{ height: "50vh", overflow: "auto" }}>
        <Table fixed compact='very' unstackable celled selectable>
          <Table.Body>
            {body}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

