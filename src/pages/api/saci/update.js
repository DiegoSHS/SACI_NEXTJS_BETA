import { connex } from "@/models/dbconn"
import { formatter } from "@/utils/dateformat"
import { RandomInt } from "@/utils/sortRegisters"


const generateDates = () => {
    const mm = RandomInt(0, new Date(Date.now()).getMonth())
    const dd = RandomInt(0, new Date(Date.now()).getDay())
    const hrss = RandomInt(0, new Date(Date.now()).getHours())
    const mins = RandomInt(0, new Date(Date.now()).getMinutes())
    const secs = RandomInt(0, new Date(Date.now()).getSeconds())
    const date = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
    const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs), false)
    return { date, res }
}

const updateall = async (req, res) => {
    const { collection } = await connex(process.env.SDB, 'logs')
    const logs = await collection.find().toArray()
    const createlog = log => {
        const { id, value } = log
        const { date, res } = generateDates()
        return {
            id, value, date, ...res
        }
    }
    const newlogs = logs.map(createlog)
    const moreLogs = logs.map(createlog)
    const all = [...newlogs, ...moreLogs]
    await collection.deleteMany({})
    const result = await collection.insertMany(all)
    return res.status(200).json(result)
}
export default updateall