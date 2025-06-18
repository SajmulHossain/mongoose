import express, { Application, Request, Response } from "express";
import { noteRoutes } from "./app/controller/notes.controllers";
import { userRoutes } from "./app/controller/users.controllers";

const app: Application = express();
app.use(express.json());

app.use("/notes", noteRoutes);
app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to mongoose app!");
});

export default app;
