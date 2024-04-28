const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function deleteForum(id:string, token:string){
    const authToken = `Bearer ${token}`;
    try {
        const response = await fetch(`${URL}/forum/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": authToken
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};