import { CollectionMaterial } from "../../models/CollectionMaterial.js";

export async function getAllCollections(_, res) {
    try {
        const collections = await CollectionMaterial.findAll();
        return res.status(200).json({collections});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al traer los datos"});
    }
}
