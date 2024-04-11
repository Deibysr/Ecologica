import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const Forum = db.define('Forum', {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    id: { type: Sequelize.STRING },
    userId: { type: Sequelize.NUMBER },
    recyclingId: { type: Sequelize.STRING }
}, { timestamps: false })