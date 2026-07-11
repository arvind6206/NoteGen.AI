import { PdfModel } from "../models/pdf.model.js";
import { NoteModel } from "../models/notes.model.js";
import { UserModel } from "../models/user.model.js";

import { extractPdfText } from "../utils/pdfExtractor.js";

import { buildPrompt } from "../utils/prompt.js";

import { generateGeminiResponse } from "../services/gemini.services.js";

export const generateNotes = async (req, res) => {

    try{

        const user = await UserModel.findById(req.userId);

        if(!user){

            return res.status(404).json({
                msg:"User not found"
            });

        }

        const pdfId = req.body.pdfId;

        const pdf = await PdfModel.findById(pdfId);

        if(!pdf){

            return res.status(404).json({
                msg:"PDF not found"
            });

        }

        const pdfText = await extractPdfText(pdf.filePath);

        const prompt = buildPrompt(pdfText);

        const aiResponse = await generateGeminiResponse(prompt);

        const note = await NoteModel.create({

            user:user._id,

            pdf:pdf._id,

            content:aiResponse

        });

        user.notes.push(note._id);

        await user.save();

        res.status(200).json({

            msg:"Notes Generated Successfully",

            notes:aiResponse,

            noteId:note._id

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            msg:"Generation Failed",

            error:error.message

        });

    }

}

export const getUserNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({
            user: req.userId
        }).populate("pdf").sort({createdat: -1})

        if(!notes){
            return res.status(400).json({
                msg: "Notes not found"
            })
        }

        res.status(200).json({
            notes: notes
        })
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch notes",
            error: error.message
        })
    }
}

export const getNotesById = async(req, res) => {
    try {
        const {id} = req.params;

        const notes = await NoteModel.findById(
            id
        )
        res.status(200).json({
            notes: notes
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server error",
            error: error.message
        })
    }
}

export const deleteNotesById = async(req, res) => {
    try {
        const {id} = req.params;

        const notes = await NoteModel.findById(id)
        if(!notes){
            return res.status(400).json({
                msg: "Note not found"
            })
        }
        await NoteModel.findByIdAndDelete(id)
        res.status(200).json({
            msg: "Notes deleted successfully",
            notes: notes
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server error",
            error: error.message
        })
    }
}