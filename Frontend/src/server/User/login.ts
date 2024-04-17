// Importa la interfaz User desde donde la tengas definida
import type { User } from "../../interfaces/User";


const URL = import.meta.env.URL_PATH; // Asegúrate de tener la URL base definida en las variables de entorno

export default async function userLogin(email: string, password: string) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    };

    try {
        const result = await fetch(`${URL}/user/login`, options);
        const data = await result.json();
        
        if (!result.ok) {
            throw new Error(data.message || "Error al iniciar sesión");
        }
        
        console.log(`Usuario ${data.user.name} ha iniciado sesión correctamente`);
        return data; // Retorna el objeto con la información del usuario y el token
    } catch (error) {
        console.error("Error en login:", error);
        throw error; // Propaga el error para manejarlo en otro lado si es necesario
    }
}
