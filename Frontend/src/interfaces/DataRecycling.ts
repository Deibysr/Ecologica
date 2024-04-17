// src/interfaces/DataRecycling.ts

export interface DataRecycling {
    quantity: string;
    timeStamp: Date; // Asumiendo que quieres que el timeStamp se maneje en el frontend
    userId: number; // El ID del usuario que será provisto durante la creación
}
