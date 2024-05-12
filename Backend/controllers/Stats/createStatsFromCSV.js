import csvToJson from "convert-csv-to-json";
import KEY_DATE from "../../const/KEY_DATE.js";
import { setCollectionInDB } from "./createIndividualCollection.js";

export async function createStatsFromCSV(req, res) {
    try {
        const { file } = req;
        if (!file) return res.status(500).json({ error: "El archivo es necesario" });
        if (file.mimetype !== "text/csv") return res.status(500).json({ error: "El archivo debe ser un CSV" });
        const result = Buffer.from(file.buffer).toString("utf-8");
        const csv = csvToJson.fieldDelimiter(",").csvStringToJson(result);
        const dataToSend = {
            materials: {},
            date: ""
        };

        for (const dataObj of csv) {
            for (const material in dataObj) {
                if (material !== KEY_DATE) {
                    dataToSend.materials[material] = dataObj[material];
                }
                dataToSend.date = dataObj[KEY_DATE];
            }
            try {
                console.log(dataToSend)
                await setCollectionInDB(dataToSend.materials, dataToSend.date);
                console.log("se guardaron los datos")
            } catch (error) {
                throw error;
            }
        };

        return res.status(200).json({ msg: "Los datos se han guardado correctamente en la base de datos" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ha habido un error al crear la colección" })
    }
}
