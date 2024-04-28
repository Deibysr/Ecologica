import { Message } from "../../models/Message.js";
import { User } from "../../models/User.js";

export default async function getAllMessages(req, res){
    try {
        const forumId = req.params.forumId;
        const message = await Message.findAll({
            where: {forumId},
            include: {
                model:User,
                attributes: ['name']
            }
        });
        
        res.status(200).json(message);
    } catch (error) {
        console.error("Hubo algun problema al traer los mensajes", error);
        return res.status(500).json({error: "Hubo un error al traer los mensajes"}); 
    }
}