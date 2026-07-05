import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(cors())
dotenv.config()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/api/v1/user', userRouter)


async function main(){
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })  
}
main()