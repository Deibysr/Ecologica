import { DataRecycling } from "../../models/DataRecycling.js";

export async function createDataRecycling(req, res) {
    const dataRecycling = { ...req.body, userId: req.user.userResult.id }

    try {
        const newData = await DataRecycling.create(dataRecycling);

        res.json(newData);
    } catch (error) {
        console.error("Error al intentar insertar datos de reciclaje:", error);
        res.status(500).send("Error al procesar la solicitud");
    }
}
