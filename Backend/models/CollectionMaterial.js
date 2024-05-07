import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB();

export const CollectionMaterial = db.define('CollectionMaterial', {
    date: {
        type: Sequelize.DATE
    }
}, { timestamps: false });



