const URL = import.meta.env.PUBLIC_URL_PATH; 

export default async function createForum(token:string, forumData:{title:string, description:string}) {
    const authToken = `Bearer ${token}`;
    try {
        const result = await fetch(`${URL}/forum/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify(forumData)
        });
        const newForum = await result.json();
        if(!newForum.error){
            return newForum;
        }
        throw new Error(newForum.error);
    } catch (error) {
        console.log(error);
        throw error;
    }
}