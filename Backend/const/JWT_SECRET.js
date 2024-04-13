import dotevn from 'dotenv';

dotevn.config()

export const JWT_SECRET = process.env.JWT_KEY; // !New: Definir una clave secreta para el JWT