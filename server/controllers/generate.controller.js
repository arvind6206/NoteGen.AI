import { NoteModel } from "../models/notes.model.js";
import { UserModel } from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/prompt.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if(!topic){
        return res.status(400).json({
            msg: "topic is required"
        })
    }

    const user = await UserModel.findById(req.userId)
    if(!user){
        return res.status(400).json({
            msg: "user not found"
        })
    }

    const prompt = buildPrompt({
        topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart
    })

    const aiResponse = await generateGeminiResponse(prompt)

    const notes = await NoteModel.create({
        user: user._id,
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
        content: aiResponse
    })

    if(!Array.isArray(user.notes)){
        user.notes = []
    }

    user.notes.push(notes._id)
    await user.save()
    
    return res.status(200).json({
        data: aiResponse,
        noteId: notes._id,
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
        error: "Ai generation failed",
        message: error.message
    })
  }
};
