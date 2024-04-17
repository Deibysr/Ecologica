// src/interfaces/Forum.ts

export interface Forum {
    id?: number; // id es opcional porque se genera automáticamente cuando se crea un nuevo foro
    title: string;
    description: string;
    userId: number; // ID del usuario que crea el foro
    createdAt?: Date; // Opcional, generalmente generado por la base de datos
    updatedAt?: Date; // Opcional, generalmente generado por la base de datos
}
