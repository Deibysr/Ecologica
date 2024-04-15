import type { User } from "../../interfaces/User";

const URL = import.meta.env.URL_PATH
export default async function userRegister(userdata: User){
    console.log(URL)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata)
    }
    try {
        const result = await fetch(`http://localhost:3001/user/register`, options)
        const user = await result.json()
        console.log(user)
    } catch (error) {
        console.error(error)
    }

}