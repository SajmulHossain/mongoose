import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async(req: Request, res: Response) => {
    const myNote = new Note({
        content: "Ami mongoose sikhteci aro valo",
        title: "First note",
        publishDate: "OI kir eoi"  
    })

    await myNote.save();

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: myNote
    })
})

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to mongoose app!");
});

export default app;
