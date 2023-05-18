import { NoData } from "@/components/NoTasks"
import { SensorCards } from "@/components/SensorCard"

const Index = ({ sensors }) => {
    return (
        <>
            <h1>Sensores</h1>
            <p>Aqui se muestran los sensores existentes</p>
            {
                sensors == undefined || sensors.length === 0 ? <NoData /> : <SensorCards data={sensors} />
            }
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const response = await fetch(`${process.env.API_URL}/api/saci/sensor`)
    const sensors = await response.json()
    console.log(sensors)
    return {
        props: {
            sensors 
        }
    }
}

export default Index