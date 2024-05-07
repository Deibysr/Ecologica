import { Sequelize } from "sequelize";
import { CollectionMaterial } from "../../models/CollectionMaterial.js";

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
        return res.status(200).json({filterCollections});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al traer los datos"});
    }
}
