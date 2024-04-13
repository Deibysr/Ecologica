import { Forum } from "../../models/forum.js"

export default async function createForum(req, res){
    console.log(req.user)
    try {
        const forumData = { ...req.body, userId: req.user.userResult.id }
        const forum = await Forum.create(forumData)
        res.json(forum);
    } catch (error) {
        console.error("Hubo algun problema al intentar crear el foro", error);
    }
}