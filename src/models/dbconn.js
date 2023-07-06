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
        console.error(`Error connecting to the database: ${error.message}`)
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
            console.log('Using existent database client')
        }else{
            console.log('Creating a new database client')
            client = await createClient()
        }
        return client
    } catch (error) {
        console.error(`Error validating the database client: ${error.message}`)
        return
    }
}
/**
 * 
 * @param {String} dbname The name of the database
 * @param {String} collec The name of the collection
 * @returns {Collection} Returns an object with the collection
 */
export const connex = async (dbname = 'test', collec = 'tasks') => {
    try {
        const client = await validateClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return collection
    } catch (error) {
        console.error(`Error retrieving database collection: ${error.message}`)
        return
    }
}