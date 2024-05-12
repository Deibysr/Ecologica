import { CollectionMaterial } from "../../models/CollectionMaterial.js";
import { getMaterials } from "./getMaterials.js";

export async function getAllCollections(_, res) {
    try {
        const collections = await CollectionMaterial.findAll();
        const materials = await getMaterials(collections);
        return res.status(200).json({materials});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al traer los datos"});
    }
}
