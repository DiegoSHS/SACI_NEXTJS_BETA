import { MongoClient } from "mongodb"

export const createClient = (uri = process.env.MONGO_URI) => {
    try {
        const client = new MongoClient(uri)
        return client
    } catch (error) {
        throw error
    }
}

let client = null

export const connex = async ( dbname = 'test', collec = 'tasks') => {
    try {
        client = client || createClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return { collection, datab }
    } catch (error) {
        console.log(error)
        return
    }
}