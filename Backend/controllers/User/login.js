import { User } from "../../models/User.js";
import comparePassword from "../../utils/comparePassword.js";

export async function loginUser(req, res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if (!user) {
            console.error("No existe un usuario con ese correo: ", email)
            res.status(400).send("Este correo no existe")
        }
        const isPassword = await comparePassword(password, user.password)
        if (!isPassword) {
            console.error("Esta mal la contraseña: ")
            res.status(401).send("Contraseña no pertenece al usuario")
            return
        }
        const userResult = user.toJSON();
        delete userResult.password;
        console.log(`user: ${userResult.name} ha sido logeado correctamente`);
        res.json(userResult);
    } catch (error) {
        
    }
}