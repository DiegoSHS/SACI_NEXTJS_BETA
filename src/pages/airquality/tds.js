import { SaciPanes } from "@/components/SaciChart"
import { Header, Tab } from "semantic-ui-react"
import { StoredContext } from "@/context/context"
import { useEffect } from "react"
import { connex } from "@/models/dbconn"
import { getDetailedLogs } from "@/models/transactions"
import { validateFetch } from "../ground"

const HomePage = ({ data }) => {
    const { records, setrecords } = StoredContext()

    useEffect(() => {
        setrecords({ saci: { ...records.saci, tds_agua } })
        console.log(records)
    }, [])

    const tds_agua = validateFetch(records, 'tds_agua') ? data : records.saci.tds_agua
    const panes = SaciPanes(tds_agua)

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
    const { collection } = await connex(process.env.SDB, 'logs')
    const data = await getDetailedLogs(collection, 'tds_agua')

    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default HomePage