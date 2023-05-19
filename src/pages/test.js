import { StoredContext } from "@/context/context"
import axios from "axios"
import { useEffect } from "react"
import { Button } from "semantic-ui-react"

const Page = ({ temp_aire }) => {
    const { records, setrecords } = StoredContext()
    useEffect(() => {
        setrecords({ saci: { temp_aire } })
        console.log(records)
    }, [])
    return <div>Test Page
        <Button onClick={() => {
            setrecords([...records, 'dd2'])
            console.log(records)
        }}>cambiar estado</Button>
    </div>
}

export const getServerSideProps = async ctx => {
    const { data } = axios.get(`${process.env.API_URL}/api/saci/logs/`)
    return {
        props: {
            temp_aire: data
        }
    }
}


export default Page