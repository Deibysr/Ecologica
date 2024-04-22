import type { User } from "../../interfaces/User";

const URL = import.meta.env.PUBLIC_URL_PATH;

export default async function userRegister(userdata: User){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata)
    }

    try {
        const result = await fetch(`${URL}/user/register`, options)
        const user = await result.json()
        if(user.error) console.error(user.error);
        return user;
    } catch (error) {
        console.error(error)
        throw error;
    }

}