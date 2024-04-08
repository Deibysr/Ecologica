import express from "express";
import router from "./router/router.js";

const port = 3001
const app = express()

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router)


app.listen(port, () => console.log(`Servidor conectdo en el puerto ${port}`))

