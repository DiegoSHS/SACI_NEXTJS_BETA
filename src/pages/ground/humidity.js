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
        hume_suelo = records.hume_suelo || data,
        panes = SaciPanes(hume_suelo[sensor])

    useEffect(() => {
        setrecords({ ...records, hume_suelo })
    }, [])

    return (
        <>
            <Header size="large">Humedad del suelo</Header>
            <GenerateCheckBox data={data} sensor={sensor} stateFn={setSensor} />
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
    const collection = await connex(process.env.SDB, 'logs'),
        results = await Promise.allSettled([
            getDetailedLogs(collection, 'humedad_suelo'),
            getDetailedLogs(collection, 'humedad_suelo_s1'),
            getDetailedLogs(collection, 'humedad_suelo_s2'),
        ]),
        data = results.map(({ value }) => value)
    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default HomePage