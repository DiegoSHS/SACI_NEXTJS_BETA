import { SaciPanes } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { StoredContext } from "@/context/context"
import { useEffect, useState } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions/logs"
import { GenerateCheckBox } from "@/components/Checkbox"
/**
 * Validate if the field is in the records object
 * @param {Object} records object with the records of the sensors
 * @param {String} key field to validate
 * @returns {Boolean} true if the field is in the records object or false if not
 */
export const validateFetch = (records, key) => (records === {} || records.saci === undefined || records.saci[key] === undefined)

const HomePage = ({ data }) => {
  const { records, setrecords } = StoredContext()
  const [sensor, setSensor] = useState(0)
  useEffect(() => {
    setrecords({ saci: { ...records.saci, temp_suelo } })
    console.log(records)
  }, [])

  const temp_suelo = validateFetch(records, 'temp_suelo') ? data : records.saci.temp_suelo
  const panes = SaciPanes(temp_suelo[sensor])

  return (
    <>
      <Header size="large">Suelo</Header>
      <GenerateCheckBox data={temp_suelo} sensor={sensor} stateFn={setSensor} />
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
  const collection = await connex(process.env.SDB, 'logs')

  const results = await Promise.allSettled([
    getDetailedLogs(collection, 'temperatura_suelo'),
    getDetailedLogs(collection, 'temperatura_suelo_s1'),
    getDetailedLogs(collection, 'temperatura_suelo_s2'),
  ])
  const data = results.map(({ value }) => value)
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

export default HomePage