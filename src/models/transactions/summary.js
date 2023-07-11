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
    ]),
        phPromises = await Promise.allSettled([
            getLast(collection, 'ph_suelo'),
            getLast(collection, 'ph_suelo_s1'),
            getLast(collection, 'ph_suelo_s2'),
        ]),
        humPromises = await Promise.allSettled([
            getLast(collection, 'humedad_suelo'),
            getLast(collection, 'humedad_suelo_s1'),
            getLast(collection, 'humedad_suelo_s2'),
        ]),
        tempValues = tempPromises.map(({ value }) => value[0]),
        phValues = phPromises.map(({ value }) => value[0]),
        humValues = humPromises.map(({ value }) => value[0]),
        tempAvg = Math.trunc(((tempValues.reduce((acc, e) => acc + e.value, 0) / tempValues.length))),
        phAvg = Math.trunc((phValues.reduce((acc, e) => acc + e.value, 0) / phValues.length), 2),
        humAvg = Math.trunc((humValues.reduce((acc, e) => acc + e.value, 0) / humValues.length)),
        suelo = { tempAvg, phAvg, humAvg },
        airePromises = await Promise.allSettled([
            getLast(collection, 'temperatura_aire'),
            getLast(collection, 'humedad_aire'),
            getLast(collection, 'cantidad_co2'),
            getLast(collection, 'luminosidad'),
            getLast(collection, 'radiacion_solar_aire'),
            getLast(collection, 'tds_agua'),
            getLast(collection, 'nivel_agua'),
        ]),
        aireValues = airePromises.map(({ value }) => value[0]),
        aire = {
            tempAire: aireValues[0]?.value,
            humAire: aireValues[1]?.value,
            co2: aireValues[2]?.value,
            lum: aireValues[3]?.value,
            radiation: aireValues[4]?.value
        },
        agua = {
            tds: aireValues[5]?.value,
            nivel: aireValues[6]?.value
        }
    console.log('Summary of sensor logs retrieved')
    return { suelo, aire, agua }
}