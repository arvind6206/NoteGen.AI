import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
      required: true,
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    title:{
      type: String,
      required: true
    },
    noteType:{
      type: String,
      enum: ["short", "detailed", "exam", "revision"],
      default: "detailed"
    },
    favourite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export const NoteModel = mongoose.model("Note", noteSchema);