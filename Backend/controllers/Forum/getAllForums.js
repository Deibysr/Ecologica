import { Forum } from "../../models/Forum.js";

export default async function getAllForums(req, res){
    try {
        const forums = await Forum.findAll();
        res.status(200).json(forums);
    } catch (error) {
        console.error("Hubo algun problema al traer los foros", error);
        return res.status(500).json({error: "Hubo un error al traer los foros"}); 
    }
}