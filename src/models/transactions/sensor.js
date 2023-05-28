export const getActuator = async (collection, id) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador', name: id } },
        { $project: { _id: 0,name:1,state:1 } }
    ]).toArray()
    return actuators
}

export const getActuators = async (collection) => {
    const actuators = await collection.aggregate([
        { $match: { module: 'actuador' } },
        { $project: { _id: 0 } }
    ]).toArray()
    return actuators
}