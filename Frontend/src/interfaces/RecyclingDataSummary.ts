// src/interfaces/RecyclingDataSummary.ts

export interface RecyclingDataSummary {
    date: string; // Porque estamos agrupando por fecha
    totalQuantity: string; // La suma de las cantidades por fecha
    typeRecycling: string; // Tipo de reciclaje si tu modelo lo incluye
}
