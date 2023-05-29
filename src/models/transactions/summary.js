import { Collection } from "mongodb"

/**
 * Get last value of a sensor
 * @param {Collection} collection collection object
 * @param {String} id name of the sensor
 * @returns 
 */
export const getLast = (collection, id) => {
    return collection.aggregate([
        { $match: { id: id } },
        { $sort: { date: -1 } },
        { $project: { _id: 0 } },
        { $limit: 1 },
    ]).toArray()
}
/**
 * Gets the last value of each sensor, if are more than one sensor, it gets the average
 * @param {Collection} collection collection object
 * @returns 
 */
export const getSummary = async (collection) => {
    const tempPromises = await Promise.allSettled([
        getLast(collection, 'temperatura_suelo'),
        getLast(collection, 'temperatura_suelo_s1'),
        getLast(collection, 'temperatura_suelo_s2'),
    ])
    const phPromises = await Promise.allSettled([
        getLast(collection, 'ph_suelo'),
        getLast(collection, 'ph_suelo_s1'),
        getLast(collection, 'ph_suelo_s2'),
    ])
    const humPromises = await Promise.allSettled([
        getLast(collection, 'humedad_suelo'),
        getLast(collection, 'humedad_suelo_s1'),
        getLast(collection, 'humedad_suelo_s2'),
    ])
    const tempValues = tempPromises.map(({ value }) => value[0])
    const phValues = phPromises.map(({ value }) => value[0])
    const humValues = humPromises.map(({ value }) => value[0])

    const tempAvg = Math.trunc(((tempValues.reduce((acc, e) => acc + e.value, 0) / tempValues.length)))
    const phAvg = Math.trunc((phValues.reduce((acc, e) => acc + e.value, 0) / phValues.length), 2)
    const humAvg = Math.trunc((humValues.reduce((acc, e) => acc + e.value, 0) / humValues.length))
    const suelo = { tempAvg, phAvg, humAvg }

    const airePromises = await Promise.allSettled([
        getLast(collection, 'temperatura_aire'),
        getLast(collection, 'humedad_aire'),
        getLast(collection, 'cantidad_co2'),
        getLast(collection, 'luminosidad'),
        getLast(collection, 'radiacion_solar_aire'),
        getLast(collection, 'tds_agua')
    ])
    const aireValues = airePromises.map(({ value }) => value[0])
    const aire = {
        tempAire: aireValues[0]?.value,
        humAire: aireValues[1]?.value,
        co2: aireValues[2]?.value,
        lum: aireValues[3]?.value,
        radiation: aireValues[4]?.value,
        tds: aireValues[5]?.value
    }
    return { suelo, aire }
}