import { months } from "@/utils/sortRegisters"
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tab, Table } from "semantic-ui-react"

export const SaciChart = ({ data, dataKeyY, dataKeyX }) => {
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
        <Line animationDuration={250} strokeWidth={2} type="monotone" dataKey={dataKeyY} stroke="#8884d8" />
        <Brush height={20} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const SaciChartWithDays = ({ data }) => {
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
        <XAxis type="category" allowDuplicatedCategory={true} dataKey="createdAt" />
        <YAxis
          domain={[0, 20]}
          axisLine={false}
          tickLine={false}
          tickCount={12}
          interval={0}
          minTickGap={0}
        />
        <Tooltip />
        <Legend />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="ppm" stroke="#8884d8" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="tds" stroke="#8884d8" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="uScm" stroke="#82ca9d" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="nm" stroke="#82ca9d" />
        <Brush height={20} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const SaciPanesActual = (data) => {
  const panes = data.map((arr, i) => {
    const now = new Date(Date.now()).getMonth()
    if (i > now) {
      return ({ menuItem: months[i], render: () => <Tab.Pane attached={false}>{ }</Tab.Pane> })
    } else {
      return ({ menuItem: months[i], render: () => <Tab.Pane attached={false}>{<SaciChartDay data={arr} />}</Tab.Pane> })
    }
  })
  return panes
}

export const SaciPanes = (data) => {
  const panes = data.map((arr, i) => {
    return ({ menuItem: months[i], render: () => <Tab.Pane attached={false}>{<SaciChartDay data={arr} />}</Tab.Pane> })
  })
  return panes
}

const SaciChartDay = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" aspect={2} height="100%">
      <LineChart
        style={{ backgroundColor: "white", borderRadius: "5px", margin: "1px" }}
        data={data}
        margin={{
          top: 15,
          right: 15,
          left: 0,
          bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis type="category" allowDuplicatedCategory={true} dataKey="day" />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={12}
          interval={0}
          minTickGap={0}
        />
        <Tooltip allowEscapeViewBox={false} />
        <Legend />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="ppm" stroke="#8884d8" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="tds" stroke="#8884d8" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="uScm" stroke="#82ca9d" />
        <Line connectNulls animationDuration={250} activeDot={{ r: 5 }} strokeWidth={2} type="monotone" dataKey="nm" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const SaciTable = ({ data }) => {
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

