import { Sequelize } from "sequelize";
import { CollectionMaterial } from "../../models/CollectionMaterial.js";

export async function getCollectionByMonth(req, res) {
    try {
        const {date} = req.body;
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMont() + 1;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
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
