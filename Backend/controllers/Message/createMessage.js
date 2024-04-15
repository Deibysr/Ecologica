import { Message } from "../../models/Message.js";

export async function createMessage(req, res) {
    try {
        console.log(req.user)
        const messageData = {
            userId: Number(req.user.userResult.id),
            forumId: Number(req.params.forumId),
            content: req.body.content
        };
        console.log(messageData)
        const message = await Message.create(messageData);

        res.json(message);
    } catch (error) {
        console.error("Hubo algún problema al intentar crear el mensaje", error);
        res.status(500).send("Error al procesar la solicitud");
    }
}
