import { Schema, model, models } from "mongoose"

const mongoTask = new Schema({
    title: {
        type: String,
        required: [true,'El titulo es requerido'],
        unique: true,
        trim: true,
        maxLength: [50,'El titulo debe tener menos de 50 carácteres']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: [200, 'Solo se permiten 200 caracteres para la descripcion']
    }
},{
    timestamps: true,
    versionKey: false
})

//export default models.Task || model('Task',mongoTask)