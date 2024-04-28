const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function getAllForums(){
    try {
        const result = await fetch(`${URL}/forum/getAll`);
        const forums = await result.json();
        if(!forums.error){
            return forums;
        }
        throw new Error(forums.error);
    } catch (error) {
        console.error(error);
        throw error;
    }
};