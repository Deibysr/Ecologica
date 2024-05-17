import { JWT_SECRET } from "../../const/JWT_SECRET.js";
import { User } from "../../models/User.js";
import comparePassword from "../../utils/comparePassword.js";
import jwt from 'jsonwebtoken'; // !New Importar jsonwebtoken


export async function loginUser(req, res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        console.log(JWT_SECRET)
        if (!user) {
            console.error("No existe un usuario con ese correo: ", email)
            return res.status(400).json({error:"Este correo no existe"});
        }
        const isPassword = await comparePassword(password, user.password)
        if (!isPassword) {
            console.error("Esta mal la contraseña: ")
            return res.status(401).json({error:"La contraseña es incorrecta, pruebe nuevamente"})
        }
        const userResult = user.toJSON();
        delete userResult.password;

        const token = jwt.sign({ userResult }, JWT_SECRET, { expiresIn: '12h' });

        console.log(`user: ${userResult.name} ha sido logeado correctamente`);
        res.json({ user: userResult, token }); // ! New
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Ha habido un error al loggear el usuario."});
    }
}