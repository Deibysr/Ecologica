// src/server/Forum/createForum.ts

import type { Forum } from '../../interfaces/Forum';

const URL = import.meta.env.VITE_API_URL; // Cambia esta línea para que coincida con tus variables de entorno

export default async function createForum(forumData: Omit<Forum, 'id'>): Promise<Forum> {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Aquí agregarías cualquier cabecera de autenticación si es necesario
            // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify(forumData)
    };

    try {
        const result = await fetch(`${URL}/forum/create`, options);
        if (!result.ok) {
            throw new Error('Error al crear el foro');
        }
        const createdForum: Forum = await result.json();
        return createdForum;
    } catch (error) {
        console.error('Error en createForum:', error);
        throw error;
    }
}
