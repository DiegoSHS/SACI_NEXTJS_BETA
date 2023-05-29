import { Collection, MongoClient } from "mongodb"

/**
 * Creates a database client
 * @param {String} uri Conection string to the database
 * @returns {MongoClient} Returns a MongoClient object
 */
export const createClient = async (uri = process.env.MONGO_URI) => {
    try {
        return await MongoClient.connect(uri)
    } catch (error) {
        console.log(error.message)
        return
    }
}
/**
 * Client to connect to the database
 * @type {MongoClient}
 */
let client = null
/**
 * Validates if the client exists, if not, creates a new one
 * @returns {MongoClient} Returns a MongoClient object
 */
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
/**
 * 
 * @param {String} dbname The name of the database
 * @param {String} collec The name of the collection
 * @returns {Collection} Returns an object with the collection and the database
 */
export const connex = async (dbname = 'test', collec = 'tasks') => {
    try {
        const client = await validateClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return { collection }
    } catch (error) {
        console.log(error)
        return
    }
}