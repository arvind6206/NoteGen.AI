import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/api/v1/user', userRouter)


async function main(){
        await mongoose.conmect(process.env.MONGO_URI)
        console.log("DB Connected")
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })  
}
main()