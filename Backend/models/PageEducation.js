import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const PageEducation = db.define('PageEducation', {
    sectionId: { type: Sequelize.STRING },
    id: { type: Sequelize.NUMBER },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    timeStamp: { type: Sequelize.STRING },
}, { timestamps: false })