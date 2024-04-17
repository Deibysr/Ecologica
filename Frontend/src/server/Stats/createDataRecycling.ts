// src/server/Stats/createDataRecycling.ts

import type { DataRecycling } from '../../interfaces/DataRecycling';

const URL = import.meta.env.VITE_API_URL; // Asegúrate de que tienes una variable de entorno para tu API URL

export default async function createDataRecycling(dataRecycling: DataRecycling) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Aquí deberías incluir el header para la autorización si es necesario
            // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(dataRecycling)
    };

    try {
        const result = await fetch(`${URL}/stats/data-recycling`, options);
        if (!result.ok) {
            throw new Error('Error al enviar los datos de reciclaje');
        }
        const responseData = await result.json();
        return responseData;
    } catch (error) {
        console.error('Error al intentar insertar datos de reciclaje:', error);
        throw error;
    }
}
