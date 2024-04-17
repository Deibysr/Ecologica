import { Forum } from "../../models/Forum.js"

export default async function createForum(req, res){
    console.log(req.user)
    try {
        const forumData = { ...req.body, userId: req.user.userResult.id }
        const forum = await Forum.create(forumData)
        res.status(201).json(forum);
    } catch (error) {
        console.error("Hubo algun problema al intentar crear el foro", error);
        res.status(500).send("Hubo un error al crear el foro"); // Envía un mensaje genérico de error al cliente
    }
}