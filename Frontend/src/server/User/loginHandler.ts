import userLogin from './login'; // Ajusta la importación según sea necesario

async function handleLogin() {
    const email = "test@example.com";
    const password = "123456";
    try {
        const sessionData = await userLogin(email, password);
        console.log(sessionData.token); // Aquí manejas el token como lo necesites
        // Por ejemplo, puedes almacenarlo en localStorage o manejarlo con un state manager
    } catch (error) {
        console.error("Login fallido:", error);
    }
}