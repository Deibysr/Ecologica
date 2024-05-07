import { Sequelize } from "sequelize";
import connectDB from "../DB/config/config.js";
import { CollectionMaterial } from "./CollectionMaterial.js";

const db = await connectDB();

export const Material = db.define("Material", {
    name: {
        type: Sequelize.STRING,
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    collectionID: {
        type: Sequelize.INTEGER,
        references:{
            model: CollectionMaterial,
            key:"id",
            onDelete: `CASCADE`
        }
    }
}, {timestamps:false});

