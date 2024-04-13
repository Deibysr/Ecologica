import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';
import { User } from './User.js';

const db = await connectDB()

export const Forum = db.define('Forum', {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    userId: { type: Sequelize.INTEGER, references: {
        model: User,
        key: "id",
    } },
}, { timestamps: false })