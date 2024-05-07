import express from "express";
import userRouter from "./router/userRouter.js";
import forumRouter from "./router/forumRouter.js";
import connectDB from "./DB/config/config.js";
import cors from "cors";
import { dbSync } from "./DB/config/dbSync.js";
import collectionMaterialRouter from "./router/collectionMaterialRouter.js";

const port = 3001;

await connectDB();

await dbSync();

const app = express();
app.use(cors({
    origin: process.env.HOST || 'http://localhost:4321'
}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/forum", forumRouter);
app.use("/stats", collectionMaterialRouter);



app.listen(port, () => console.log(`Servidor conectado en el puerto ${port}`))

