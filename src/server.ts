import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let server:Server;

const PORT = 3000;

async function main() {
    try {
        await mongoose.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pknd7d9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        server = app.listen(PORT, () => {
            console.log(`App listening on PORT: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();