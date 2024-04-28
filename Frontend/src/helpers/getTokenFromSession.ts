import { checkUserLogged } from "@/server/User/auth";

export default function getTokenFromSession(){
    const session = checkUserLogged();
    if(!session) return null;
    const {token} = session;
    return token;
}