const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function getDataByMonth(date: string){
    try {
        const result = await fetch(`${URL}/stats/getByMonth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({date})
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