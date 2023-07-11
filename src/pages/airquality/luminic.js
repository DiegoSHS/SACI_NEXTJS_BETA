import { SaciPanes } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions/logs"
import { validateFetch } from "../ground"

const HomePage = ({ data }) => {
    const { records, setrecords } = StoredContext(),
        luminosidad = validateFetch(records, 'luminosidad') ? data : records.saci.luminosidad,
        panes = SaciPanes(luminosidad)

    useEffect(() => {
        setrecords({ saci: { ...records.saci, luminosidad } })
        console.log(records)
    }, [])

    return (
        <>
            <Header size="large">Suelo</Header>
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
        data = await getDetailedLogs(collection, 'luminosidad')

    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default HomePage