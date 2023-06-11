import { Collection } from 'mongodb'
/**
 * Gets only the actuators
 * @param {Collection} collection collection object
 * @param {String} id name of the sensor
 * @returns 
 */
export const getActuator = async (collection, id) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador', name: id } },
        { $project: { _id: 0,name:1,state:1 } }
    ]).toArray()
    return actuators
}
/**
 * Gets all the actuators
 * @param {Collection} collection collection object
 * @returns 
 */
export const getActuators = async (collection) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador' } },
        { $project: { _id: 0 } }
    ]).toArray()
    return actuators
}
export const enableActuator = async (collection, id, enable) => {
    const result = await collection.updateOne({
        module: 'actuador',
        name: id
    }, {
        $set: { state: enable }
    })
    return result
}