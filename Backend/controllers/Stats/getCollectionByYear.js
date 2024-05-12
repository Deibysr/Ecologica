import { Sequelize } from "sequelize";
import { CollectionMaterial } from "../../models/CollectionMaterial.js";
import { getMaterials } from "./getMaterials.js";

export async function getCollectionByYear(req, res) {
    try {
        const {year} = req.body;
        const parsedYear = new Date(year);

        const startDate = new Date(parsedYear, 0, 1);
        const endDate = new Date(parsedYear, 11, 31);

        const filterCollections = await CollectionMaterial.findAll({
            where:{
                date:{
                    [Sequelize.Op.between]: [startDate, endDate]
                }
            }
        });
        const materials = await getMaterials(filterCollections);
        const result = filterCollections.map((collection)=> {
            const currentMaterial = materials.filter(material=> material[0].toJSON().collectionID === collection.toJSON().id);
            return {material: currentMaterial[0], date: collection.toJSON().date}
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al traer los datos"});
    }
}
