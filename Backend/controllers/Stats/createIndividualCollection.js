import allMaterials from "../../const/MATERIALS.js";
import { CollectionMaterial } from "../../models/CollectionMaterial.js";
import { Material } from "../../models/Material.js";

const createMaterials = async (materials, id)=>{
    const promises = [];
    for(const material in materials){
        if(!allMaterials.includes(material)){
            throw new Error("Alguno de los materiales es incorrecto!");
        }
        const quantity = materials[material];
        const materialPromise = Material.create({name:material, quantity, collectionID: id});
        promises.push(materialPromise);
    }
    const newMaterials = await Promise.all(promises);
    return newMaterials.map(material=> material.toJSON());
}

export async function createIndividualCollection(req, res) {
    try {
        const {materials, date} = req.body;
        const newCollection = await CollectionMaterial.create({date: new Date(date)});
        const collectionJson = newCollection.toJSON();
        const allMaterials = await createMaterials(materials, collectionJson.id);
        return res.status(200).json({allMaterials, date: collectionJson.date});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al crear la colección"})
    }
}
