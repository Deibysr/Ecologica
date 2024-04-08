import { userData, User } from "../models/User.js";

export async function registerUser(req, res) {
    try {
        const userData = req.body;
        await User.create(userData); // Asumiendo que esto también devuelve una promesa
        const users = await User.findAll();
        console.log(users); // Ahora users debe ser el resultado de la consulta
        // Aquí puedes enviar `users` como respuesta, por ejemplo:
        // res.json(users);
    } catch (err) {
        console.error(err);
        // Manejo de error, por ejemplo, enviando una respuesta de error al cliente
        res.status(500).send("Error al procesar la solicitud");
    }
}
