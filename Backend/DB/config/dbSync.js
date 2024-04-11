import connectDB from "./config.js";

export async function dbSync(){
    try {
        const db = await connectDB( )
        await db.sync()
        console.log("Base de datos sincronizada");
    } catch (error) {
        console.error("Hubo un error al sincronizar la base de datos", error)
    }
}