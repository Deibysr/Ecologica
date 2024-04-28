import { Forum } from "../../models/Forum.js"

export default async function createForum(req, res){
    try {
        const forumData = { ...req.body, userId: req.user.userResult.id }
        const forum = await Forum.create(forumData)
        return res.status(201).json(forum);
    } catch (error) {
        console.error("Hubo algun problema al intentar crear el foro", error);
        return res.status(500).json({error:"Hubo un error al crear el foro"}); 
    }
}
