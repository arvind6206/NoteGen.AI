import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PdfModel } from "../models/pdf.model.js"


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

export const uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                msg: "No file uploaded"
            });

        }

        const user = await UserModel.findById(req.userId);

        if (!user) {

            return res.status(404).json({
                msg: "User not found"
            });

        }

        const pdf = await PdfModel.create({

            user: user._id,

            originalName: req.file.originalname,

            fileName: req.file.filename,

            filePath: req.file.path,

            fileSize: req.file.size,

            mimeType: req.file.mimetype,

        });

        user.pdfs.push(pdf._id);

        await user.save();

        return res.status(200).json({

            msg: "PDF Uploaded Successfully",

            pdfId: pdf._id

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            msg: "Upload Failed",

            error: error.message

        });

    }

};