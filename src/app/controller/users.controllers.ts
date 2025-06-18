import express, { Application, Request, Response } from "express";
import { User } from "../models/users.moel";

const app: Application = express();

export const userRoutes = express.Router();

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "Users got successfully",
    users,
  });
});

userRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    message: "User got successfully",
    user,
  });
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const { body } = req;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

userRoutes.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const user = await User.findByIdAndUpdate(id, body, { new: true });

  res.status(201).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

userRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
});
