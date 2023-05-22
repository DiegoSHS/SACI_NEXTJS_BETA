import { MongoClient } from "mongodb"

export const createClient = async (uri = process.env.MONGO_URI) => {
    try {
        return await MongoClient.connect(uri)
    } catch (error) {
        console.log(error.message)
        return
    }
}

let client = null

const validateClient = async () => {
    try {
        if (client != null){
            console.log('client already exists')
        }else{
            console.log('creating a new client')
            client = await createClient()
        }
        return client
    } catch (error) {
        console.log(error)
        return
    }
}

export const connex = async (dbname = 'test', collec = 'tasks') => {
    try {
        const client = await validateClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return { collection, datab }
    } catch (error) {
        console.log(error)
        return
    }
}