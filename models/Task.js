import mongoose from 'mongoose'
const {Schema, model} = mongoose

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: "User"
    },
    tetramino: {
        type: Schema.Types.ObjectID,
        ref: "Schedule"
    },
}, {timestamps: true})

export default model('Task', taskSchema)