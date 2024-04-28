import { checkUserLogged } from "../server/User/auth";

export default function getRole(){
    const user = checkUserLogged();
    if(!user) return {admin:false};
    const role = Boolean(user.user.isAdmin);
    return {admin:role};
}