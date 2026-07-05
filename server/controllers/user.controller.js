import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcryptjs'

export const userController = async(req, res) => {
    try {
        const {name, email, password} = req.body

        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                mag: "User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            name, email, password: hashedPassword
        })
        res.status(200).json({
            msg: "User signup successfully"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server Error",
            error: error.message
        })
    }
}