import { Sequelize } from "sequelize";
import { User } from "../../models/User.js";
import encryptPassword from "../../utils/encryptPassword.js";

export async function registerUser(req, res) {
    try {
        const userData = req.body;
        userData.password = await encryptPassword(userData.password);
        const user = await User.create(userData)
        const userResult = user.toJSON();
        delete userResult.password;
        console.log(`user: ${userResult.name} ha sido creado correctamente`);
        res.json(userResult);
    } catch (err) {
        if(err instanceof Sequelize.UniqueConstraintError) {
            console.error("Ya existe un usuario con ese correo electronico", err);
            res.status(400).send("El email ya existe");
        }
        console.error(err);
        res.status(500).send("Error al procesar la solicitud");
    }
}
