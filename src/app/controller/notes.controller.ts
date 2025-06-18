import express, { Application, Request, Response } from "express";
import { Note } from "../models/notes.model";

const app: Application = express();

export const noteRoutes = express.Router();


noteRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "Note got successfully",
    notes,
  });
});

noteRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await Note.findById(id);
  // const note = await Note.findOne({ _id: id })
  // const note = await Note.findOne({ _id: new ObjectId(id) });

  res.status(200).json({
    success: true,
    message: "Note got successfully",
    note,
  });
});

noteRoutes.post("/create-note", async (req: Request, res: Response) => {
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
    note,
  });
});

noteRoutes.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const note = await Note.findByIdAndUpdate(id, body, { new: true });
  // const note = await Note.updateOne({ _id: id }, body, { new: true });
  // const note = await Note.findOneAndUpdate({ _id: id }, body, { new: true });
  // const note = await Note.findOne({ _id: new ObjectId(id) });

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

noteRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await Note.findByIdAndDelete(id);
  // const note = await Note.updateOne({ _id: id }, body, { new: true });
  // const note = await Note.findOneAndUpdate({ _id: id });
  // const note = await Note.findOne({ _id: new ObjectId(id) });

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});