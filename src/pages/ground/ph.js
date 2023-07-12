import { SaciPanes } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { StoredContext } from "@/context/context"
import { useEffect, useState } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions/logs"
import { GenerateCheckBox } from "@/components/Checkbox"

const HomePage = ({ data }) => {
    const { records, setrecords } = StoredContext(),
        [sensor, setSensor] = useState(0),
        ph_suelo = records.ph_suelo || data,
        panes = SaciPanes(ph_suelo[sensor])
    useEffect(() => {
        setrecords({ ...records, ph_suelo })
    }, [])

    return (
        <>
            <Header size="large">Ph del suelo</Header>
            <GenerateCheckBox data={ph_suelo} sensor={sensor} stateFn={setSensor} />
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
        getDetailedLogs(collection, 'ph_suelo'),
        getDetailedLogs(collection, 'ph_suelo_s1'),
        getDetailedLogs(collection, 'ph_suelo_s2'),
    ])
    const data = results.map(({ value }) => value)
    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default HomePage