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