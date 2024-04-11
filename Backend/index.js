import express from "express";
import userRouter from "./router/userRouter.js";
import connectDB from "./DB/config/config.js";
import { dbSync } from "./DB/config/dbSync.js";

const port = 3001

await connectDB()

await dbSync()

const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter)


app.listen(port, () => console.log(`Servidor conectado en el puerto ${port}`))

