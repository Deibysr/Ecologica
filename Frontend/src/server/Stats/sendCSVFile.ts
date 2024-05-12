const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function sendCSVFile(token:string, formData: FormData){
    try {
        const result = await fetch(`${URL}/stats/createByCSV`, {
            method: "POST", 
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}` 
            },
        });
        const allData = await result.json();
        return allData;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}