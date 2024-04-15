import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';
import { User } from './User.js';

const db = await connectDB();

export const DataRecycling = db.define('DataRecycling', {
    quantity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timeStamp: {
        type: Sequelize.DATE // Usar DATE y marcar como NOW para el valor por defecto
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    timestamps: false
});
