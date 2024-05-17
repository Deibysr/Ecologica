const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function createMessage({content, forumId, token}: {content:string, forumId:string, token:string}) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({content})
    };

    try {
        const response = await fetch(`${URL}/forum/${forumId}/message`, options);
        const message = await response.json();
        if(!message.error){
            return message;
        }
        throw new Error(message.error); 
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        throw error;
    }
}
