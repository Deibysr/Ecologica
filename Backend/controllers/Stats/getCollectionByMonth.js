import { Sequelize } from "sequelize";
import { CollectionMaterial } from "../../models/CollectionMaterial.js";
import { getMaterials } from "./getMaterials.js";

export async function getCollectionByMonth(req, res) {
    try {
        const {date} = req.body;
        const [day, month, year] = date.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const parsedYear = parsedDate.getFullYear();
        const parsedMonth = parsedDate.getMonth() + 1;
        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0);

        const filterCollections = await CollectionMaterial.findAll({
            where:{
                date:{
                    [Sequelize.Op.between]: [startDate, endDate]
                }
            }
        });

        const materials = await getMaterials(filterCollections);
        return res.status(200).json({materials});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Ha habido un error al traer los datos"});
    }
}
