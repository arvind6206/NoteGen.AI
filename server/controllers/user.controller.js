import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body

        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                msg: "User already exist"
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

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const foundUser = await UserModel.findOne({email})
        if(!foundUser){
            return res.status(404).json({
                msg: "User does't exist first signup"
            })
        }
        const matched = await bcrypt.compare(password, foundUser.password)
        if(!matched){
            return res.status(404).json({
                msg: "Incorrect Password"
            })
        }
        const token = jwt.sign({
            id: foundUser._id
        }, process.env.JWT_SECRET)
        res.status(200).json({
            msg: "Login Successfully",
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}

export const uploadFile = (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(200).json({
        msg: "File Uploaded successfully",
        file: req.file
    })
}