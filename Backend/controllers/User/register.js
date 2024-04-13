import { Sequelize } from "sequelize";
import { User } from "../../models/User.js";
import encryptPassword from "../../utils/encryptPassword.js";
import jwt from 'jsonwebtoken'; // !New: Importar jsonwebtoken
import { JWT_SECRET } from "../../const/JWT_SECRET.js";


export async function registerUser(req, res) {
    try {
        const userData = req.body;
        userData.password = await encryptPassword(userData.password);
        const user = await User.create(userData)
        const userResult = user.toJSON();
        delete userResult.password;

        // ! New: Generar el token JWT
        const token = jwt.sign({ userResult }, JWT_SECRET, { expiresIn: '1h' });

        console.log(`user: ${userResult.name} ha sido creado correctamente`);
        res.json({ user: userResult, token });
    } catch (err) {
        if(err instanceof Sequelize.UniqueConstraintError) {
            console.error("Ya existe un usuario con ese correo electronico", err);
            res.status(400).send("El email ya existe");
        }
        console.error(err);
        res.status(500).send("Error al procesar la solicitud");
    }
}
