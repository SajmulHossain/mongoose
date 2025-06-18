import express, { Application, Request, Response } from "express";
import { User } from "../models/users.model";
import { z } from "zod";

const app: Application = express();

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  age: z.number()
})

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
  try {
    // const body = await CreateUserZodSchema.parseAsync(req.body);
    const body = req.body;

    // const user = await User.create(body);

    const user = new User(body);

    await user.hashPassword(body.password);

    user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error:any) {
    res.status(201).json({
      success: false,
      message: error?.message,
      error
    });
    
  }
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
