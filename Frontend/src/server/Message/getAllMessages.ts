const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function getAllMessages(forumId:string){
    try {
        const result = await fetch(`${URL}/forum/${forumId}/getAllMessages`);
        const messages = await result.json();
        if(!messages.error){
            return messages;
        }
        throw new Error(messages.error);
    } catch (error) {
        console.error(error);
        throw error;
    }
};