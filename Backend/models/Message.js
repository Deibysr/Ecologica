import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const Message = db.define('Message', {
    userId: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING},
    id: { type: Sequelize.STRING },
    foroId: { type: Sequelize.STRING },
    timeStamp: { type: Sequelize.STRING }
}, { timestamps: false })