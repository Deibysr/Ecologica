import type { User } from "../../interfaces/User";

export default function saveSession({user, token}:{user:User | null, token: string}){
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24);
    const sessionData = {
        user: user ?? {msg: "NO user"},
        token, 
        expirationTime: expirationTime.getTime()
    };

    localStorage.setItem("user_session", JSON.stringify(sessionData));
}