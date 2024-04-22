import { checkUserLogged } from "./auth";

export default function getRole(){
    const user = checkUserLogged();
    if(!user) return {user:false};
    return user.user.isAdmin;
}