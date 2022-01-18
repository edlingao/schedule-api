import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import helment from 'helmet'
import userRoute from './routes/user.js'
import authPosts from './routes/schedule.js'
import taskRoutes from './routes/task.js'
import cors from 'cors'

const app = express()
const __dirname = path.resolve(process.cwd(), '.')
const port = 8080

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

app.use(express.json());
app.use(express.static(`${__dirname}/dist`))
app.use(helment())
app.use(cors())

mongoose.connect(`mongodb://localhost:27017`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'schedule'
    },
    () => {
        console.log('connected to db')
    }
)

mongoose.connect( "mongodb://localhost:27017", (err, db) => {


})
app.use(express.json())

//Midlewares
app.use('/api/user', userRoute)
app.use('/api/schedule', authPosts)
app.use('/api/task', taskRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
