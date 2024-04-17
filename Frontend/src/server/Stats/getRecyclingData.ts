// src/server/Stats/getRecyclingData.ts

import type { RecyclingDataSummary } from '../../interfaces/RecyclingDataSummary';

const URL = import.meta.env.VITE_API_URL; // La URL base de tu API

export async function getRecyclingData(startDate: string, endDate: string): Promise<RecyclingDataSummary[]> {
    const queryParams = new URLSearchParams({ startDate, endDate }).toString();
    const endpoint = `${URL}/stats/recycling-data-by-date?${queryParams}`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Error al obtener los datos de reciclaje');
        }

        const recyclingData: RecyclingDataSummary[] = await response.json();
        return recyclingData;
    } catch (error) {
        console.error('Error en getRecyclingData:', error);
        throw error;
    }
}
