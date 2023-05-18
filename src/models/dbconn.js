import { MongoClient } from "mongodb"

const createClient = (uri = process.env.MONGO_URI) => {
    try {
        const client = new MongoClient(uri)
        return client
    } catch (error) {
        return
    }
}

const client = createClient()

export const connex = async (dbname = 'test', collec = 'tasks') => {
    try {
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return { collection, datab }
    } catch (error) {
        console.log(error)
        return
    }
}