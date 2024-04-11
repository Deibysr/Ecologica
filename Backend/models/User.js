import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const User = db.define('User',{
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING, unique: true},
    age: {type: Sequelize.INTEGER},
    isAdmin: {type: Sequelize.INTEGER},
    password: {type: Sequelize.STRING}
}, {timestamps: false})