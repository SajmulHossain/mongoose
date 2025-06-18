import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = model("Note", noteSchema);

app.get("/notes", async (req: Request, res: Response) => {
  
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "Note got successfully",
    notes
  });
});

app.get("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const note = await Note.findById(id);
  // const note = await Note.findOne({ _id: id })
  // const note = await Note.findOne({ _id: new ObjectId(id) });

  res.status(200).json({
    success: true,
    message: "Note got successfully",
    note
  });
});

app.post("/note/create-note", async (req: Request, res: Response) => {
  const { body } = req;

  // ***** approach - 1 to creating data
  // const myNote = new Note({
  //   title: "Learning Express",
  //   tags: { 
  //     label: "database"
  //    }
  // });

  // await myNote.save();

  // ***** approach - 2 for creating data
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to mongoose app!");
});

export default app;
