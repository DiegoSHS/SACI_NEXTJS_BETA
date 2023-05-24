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
        setrecords({ saci: { ...records.saci, hume_aire } })
        console.log(records)
    }, [])

    const hume_aire = validateFetch(records, 'hume_aire') ? data : records.saci.hume_aire
    const panes = SaciPanes(hume_aire)

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
    const data = await getDetailedLogs(collection, 'humedad_aire')

    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default HomePage