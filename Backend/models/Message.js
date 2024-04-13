import Sequelize from 'sequelize';
import connectDB from '../DB/config/config.js';

const db = await connectDB()

export const Message = db.define('Message', {
    userId: { type: Sequelize.INTEGER, references: {
        model: User,
        key: "id",
    } },
    content: { type: Sequelize.STRING},
    foroId: { type: Sequelize.STRING },
    timeStamp: { type: Sequelize.STRING }
}, { timestamps: false })

// userId: {
//     type: Sequelize.INTEGER, references: {
//         model: User,
//             key: "id",
//     }
// },