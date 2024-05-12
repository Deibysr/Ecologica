const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function getDataByYear(year: number){
    try {
        const result = await fetch(`${URL}/stats/getByYear`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({year})
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