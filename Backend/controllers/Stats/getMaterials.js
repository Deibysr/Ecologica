import { Material } from "../../models/Material.js";

export async function getMaterials(collections){
    const materialsPromises = collections.map(collection => {
        return Material.findAll({
            where: {
                collectionID: collection.toJSON().id
            }
        })
    });
    const materials = await Promise.all(materialsPromises);
    return materials;
}