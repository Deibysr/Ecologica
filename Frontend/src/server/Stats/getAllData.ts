const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function getAllData(){
    try {
        const result = await fetch(`${URL}/stats/getAll`)
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