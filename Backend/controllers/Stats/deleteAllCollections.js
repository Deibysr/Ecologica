import { CollectionMaterial } from "../../models/CollectionMaterial.js";
import { Material } from "../../models/Material.js";

export default async function deleteAllCollections(_, res){
    try {
        await Material.destroy({where:{}});
        await CollectionMaterial.destroy({where: {}});
        return res.status(201).json({msg: "Se eliminaron todos los materiales guardados."});
    } catch (error) {
        console.error("Hubo algun problema al intentar eliminar los datos", error);
        return res.status(500).json({error:"Hubo un error al eliminar los datos"}); 
    }
}