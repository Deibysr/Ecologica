import { checkUserLogged } from "../server/User/auth";

export default function changeVisibilityAuthElements() {
    const authUser = checkUserLogged();
    const hiddenElement = document.querySelector("[data-auth-user]");
    const showElement = document.querySelector("[data-logged-user]");
    if (authUser) {
        showElement?.classList.add("flex");
        showElement?.classList.remove("hidden");
    } else {
        hiddenElement?.classList.remove("hidden");
        hiddenElement?.classList.add("flex");
    }
    
}