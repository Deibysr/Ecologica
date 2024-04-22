import getSession from "../../helpers/getSession";

function isSessionExpired(){
    const sessionDataString = getSession();
    if(!sessionDataString) return true;

    const sessionData = JSON.parse(sessionDataString);
    const currentTime = new Date().getTime();
    const expiredTime = new Date(sessionData.expiredTime).getTime();

    return currentTime > expiredTime;
}

export function checkUserLogged(){
    const isExpired = isSessionExpired();
    if(isExpired){
        console.log("La sesión del usuario ya expiró o nunca estuvo loggeado");
        localStorage.removeItem("user_session");
        return null;
    }
    const sessionDataString = getSession();
    if(!sessionDataString) return null;
    return JSON.parse(sessionDataString);
}