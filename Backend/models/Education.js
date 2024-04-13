import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const Education = db.define('Education', {
    typeEducation: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    pageId: { type: Sequelize.STRING },
    userId: { type: Sequelize.NUMBER }
}, { timestamps: false })