import { SaciPanes } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions/logs"

const HomePage = ({ data }) => {
    const { records, setrecords } = StoredContext(),
        hume_aire = records.hume_aire || data,
        panes = SaciPanes(hume_aire)

    useEffect(() => {
        setrecords({ ...records, hume_aire })
    }, [])

    return (
        <>
            <Header size="large">Humedad del aire</Header>
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
        data = await getDetailedLogs(collection, 'humedad_aire')

    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default HomePage