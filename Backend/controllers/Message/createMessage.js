import { Message } from "../../models/Message.js";
import { User } from "../../models/User.js";

export async function createMessage(req, res) {
    try {
        const messageData = {
            userId: Number(req.user.userResult.id),
            forumId: Number(req.params.forumId),
            content: req.body.content
        };
        const message = await Message.create(messageData);
        
        const user = await User.findByPk(message.userId, {
            attributes: ['name']
        });

        res.status(200).json({...message.toJSON(), User:user});
    } catch (error) {
        console.error("Hubo algún problema al intentar crear el mensaje", error);
        return res.status(500).json({error:"Ha habido un error al trar de crear el mensaje."});
    }
}
