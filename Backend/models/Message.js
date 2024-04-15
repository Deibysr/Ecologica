import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';
import { User } from './User.js'; 
import {Forum }from './Forum.js'; 

const db = await connectDB();

export const Message = db.define('Message', {
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        }
    },
    content: {
        type: Sequelize.TEXT
    },
    forumId: {
        type: Sequelize.INTEGER,
        references: {
            model: Forum,
            key: "id",
        }
    },
    timeStamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Esto establece automáticamente la fecha y hora actual
    }
}, { timestamps: false });

