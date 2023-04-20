import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RTChart = ({tick}) => {
    const [interval, setinterval] = useState(tick || 1000)
    const [data, setData] = useState([])

    const dataFetching = async () => {
        let data_bar = []
        try {
            const jsonParam = await fetch('http://localhost:3000/api/saci/realTime/')
            const param = await jsonParam.json()
            data_bar = param.map(({ createdAt, dist, temp }) => {
                return {
                    createdAt: createdAt.split(' ')[1],
                    dist: dist,
                    temp: temp
                }
            })
        } catch (error) {
            console.log(error)
        }
        return data_bar
    }

    const ticker = async () => {
        const data = await dataFetching()
        setData(data)
    }

    useEffect(() => {
        const timerID = setInterval(() => {
            ticker()
        }, interval)

        return () => {
            clearInterval(timerID)
        }
    }, [interval])

    useEffect(async () => {
        const data = await dataFetching()
        setData(data)
    }, [])

    return (
        <ResponsiveContainer width="100%" aspect={3} height="100%">
            <LineChart
                style={{ backgroundColor: "white", borderRadius: "5px", margin: "1px" }}
                margin={{
                    top: 15,
                    right: 15,
                    left: 0,
                    bottom: 15,
                }}
                data={data}
            >
                <XAxis reversed={true} dataKey="createdAt" />
                <YAxis domain={[0, 20]} tickCount={20} type="number" />
                <CartesianGrid strokeDasharray="2 2" />
                <Tooltip />
                <Legend />
                <Line animationDuration={0} type="monotone" dataKey="dist" fill="#8884d8" stroke="#8884d8" />
                <Line animationDuration={0} type="monotone" dataKey="temp" fill="#8214d8" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}