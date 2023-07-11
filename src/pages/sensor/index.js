import { NoData } from "@/components/NoTasks"
import { SensorCards } from "@/components/SensorCard"
import { StoredContext } from "@/context/context"
import { validateFetch } from "../ground"
import { useEffect } from "react"
import { Button, Header } from "semantic-ui-react"
import { connex } from "@/models/dbconn"
import { getLogs } from "@/models/transactions/logs"
import Link from "next/link"

const Index = ({ data }) => {
    const { records, setrecords } = StoredContext(),
        sensors = validateFetch(records, 'sensors') ? data : records.saci.sensors
    useEffect(() => {
        setrecords({ saci: { ...records.saci, sensors } })
    }, [])
    return (
        <>
            <Header size="large">Sensores</Header>
            <Link href='/sensor/new'>
                <Button
                    style={{ marginBottom: '10px' }}
                    icon='plus'
                    content='Nuevo sensor'
                    positive
                    labelPosition="right"
                    size="tiny" />
            </Link>
            {
                sensors == undefined || sensors.length === 0 ? <NoData /> : <SensorCards data={sensors} />
            }
        </>
    )
}

export const getStaticProps = async (ctx) => {
    const collection = await connex(process.env.SDB, 'sensors')
    const data = await getLogs(collection)
    return {
        props: {
            data
        },
        revalidate: 1
    }
}

export default Index