import { MongoClient } from "mongodb"

const createClient = (uri = process.env.MONGO_URI) => {
    try {
        const client = new MongoClient(uri)
        return client
    } catch (error) {
        return
    }
}


export const connex = async (dbname = 'next-tasks', collec = 'tasks') => {
    try {
        const client = createClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return { collection, datab }
    } catch (error) {
        console.log(error)
        return
    }
}