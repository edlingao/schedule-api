import mongoose from 'mongoose'
const {Schema, model} = mongoose

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    end_hour: {
        type: String,
        required: true,
    },
    start_hour: {
        type: String,
        required: true,
    },
    week_day: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref: "User"
    }
})

export default model('Schedule', userSchema)