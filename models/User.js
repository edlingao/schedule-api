import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    schedules: [{
        type: Schema.Types.ObjectId,
        ref: "Schedule"
    }]
})

export default model('User', userSchema)