import { DataRecycling } from "../../models/DataRecycling.js";
import Sequelize from 'sequelize';

export async function getRecyclingDataByDate(req, res) {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        if (!startDate || !endDate) {
            return res.status(400).send("La fecha de inicio y la fecha de fin son requeridas");
        }

        const recyclingData = await DataRecycling.findAll({
            where: {
                timeStamp: {
                    [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            attributes: [
                [Sequelize.fn('date', Sequelize.col('timeStamp')), 'date'],
                [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
                'typeRecycling'
            ],
            group: [Sequelize.fn('date', Sequelize.col('timeStamp')), 'typeRecycling'],
            order: [[Sequelize.fn('date', Sequelize.col('timeStamp')), 'ASC']]
        });

        res.json(recyclingData);
    } catch (error) {
        console.error("Error al obtener los datos de reciclaje:", error);
        res.status(500).send("Error al procesar la solicitud");
    }
}
