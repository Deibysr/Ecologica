// src/server/Message/createMessage.ts

import type { CreateMessageRequest } from "../../interfaces/Message";

const API_URL = import.meta.env.VITE_API_URL; // Cambia la clave aquí según tu archivo .env

export default async function createMessage(messageData: CreateMessageRequest, token: string) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Suponiendo que usas un esquema de autenticación Bearer
        },
        body: JSON.stringify(messageData)
    };

    try {
        const response = await fetch(`${API_URL}/message/create`, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el mensaje');
        }
        
        console.log('Mensaje creado:', data);
        return data; // Esto retornará la respuesta del servidor, que debe incluir el mensaje creado
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        throw error; // Propaga el error para manejarlo en otra parte si es necesario
    }
}
