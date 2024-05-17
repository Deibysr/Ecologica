import { Sequelize } from "sequelize";
import { User } from "../../models/User.js";
import encryptPassword from "../../utils/encryptPassword.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../const/JWT_SECRET.js";


export async function registerUser(req, res) {
    try {
        const userData = req.body;
        userData.password = await encryptPassword(userData.password);
        const user = await User.create(userData)
        const userResult = user.toJSON();
        delete userResult.password;
        const token = jwt.sign({ userResult }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`user: ${userResult.name} ha sido creado correctamente`);
        res.json({ user: userResult, token });

    } catch (err) {
        console.error(err);
        if(err instanceof Sequelize.UniqueConstraintError) {
            return res.status(400).json({error: "Ya existe un usuario con ese correo electronico"});
        }
        res.status(500).json({error: "Error al procesar la solicitud"});
    }
}
