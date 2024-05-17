import Sequelize from 'sequelize';

let db = null;
const dbPath = process.env.DB_PATH || './DB/Ecologica.db';

export default async function connectDB(){
    if (!db){
        try {
            db = new Sequelize({
                dialect: 'sqlite',
                storage: dbPath
            })
            await db.authenticate();
            console.log('La base de datos esta conectada');            
        } catch (error) {
            console.error('Error no se pudo conectar la base de datos', error);
        }
    }
    return db;
};