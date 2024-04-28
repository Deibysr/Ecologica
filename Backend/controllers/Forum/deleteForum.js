import { Forum } from "../../models/Forum.js"
import { Message } from "../../models/Message.js"

export default async function deleteForum(req, res){
    try {
        const {forumIdDelete} = req.params;
        await Message.destroy({where:{forumId: forumIdDelete}});
        await Forum.destroy({where: {id: forumIdDelete}});
        return res.status(201).json({msg: `El foro con el id ${forumIdDelete} se ha eliminado correctamente`});
    } catch (error) {
        console.error("Hubo algun problema al intentar eliminar el foro", error);
        return res.status(500).json({error:"Hubo un error al eliminar el foro"}); 
    }
}