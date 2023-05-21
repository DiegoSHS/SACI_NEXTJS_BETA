import { NoData } from "@/components/NoTasks"
import { SensorCards } from "@/components/SensorCard"
import { StoredContext } from "@/context/context"
import { validateFetch } from "../ground"
import { useEffect } from "react"
import { Button, Icon } from "semantic-ui-react"
import { connex } from "@/models/dbconn"
import { getLogs } from "@/models/transactions"
import Link from "next/link"

const Index = ({ data }) => {
    const { records, setrecords } = StoredContext()
    useEffect(() => {
        setrecords({ saci: { ...records.saci, sensors } })
        console.log(records)
    }, [])
    const sensors = validateFetch(records, 'sensors') ? data : records.saci.sensors
    return (
        <>
            <h1>Sensores</h1>
            <p>Aqui se muestran los sensores existentes</p>
            <Link href='/sensor/new'>
                <Button icon positive labelPosition="right" size="tiny" style={{ margin: '1rem' }}>
                        añadir sensor
                        <Icon name="add"/>
                </Button>
            </Link>
            {
                sensors == undefined || sensors.length === 0 ? <NoData /> : <SensorCards data={sensors} />
            }
        </>
    )
}

export const getStaticProps = async (ctx) => {
    const { collection } = await connex(process.env.SDB, 'sensors')
    const data = await getLogs(collection)
    return {
        props: {
            data
        },
        revalidate: 60
    }
}

export default Index