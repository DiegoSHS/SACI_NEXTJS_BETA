import { mysqlTask } from "@/models/mysqlTask"
import { Sequelize } from "sequelize"

const createClient = (uri = process.env.MYSQL_URI) => {
    try {
        const sequelize = new Sequelize(uri)
        return sequelize
    } catch (error) {
        return
    }
}

export const connect = async () => {
    try {
        const sequelize = createClient()
        const Task = mysqlTask(sequelize)
        await sequelize.authenticate()
        await Task.sync()
        return { Task, sequelize }
    } catch (error) {
        console.log(error)
        return
    }
}