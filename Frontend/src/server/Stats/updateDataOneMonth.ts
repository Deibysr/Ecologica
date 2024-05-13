import type { Collection } from "@/interfaces/Materials";

const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function updateDataOneMonth(token:string, collection: Collection){
    try {
        const result = await fetch(`${URL}/stats/createOne`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(collection)
        });
        const data = await result.json();
        if(!data.error){
            return data;
        }
        throw new Error(data.error);
    } catch (error) {
        console.error(error);
        throw error;
    }
}