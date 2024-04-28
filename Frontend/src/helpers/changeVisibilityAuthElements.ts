import { $ } from "@/util/DOMUtils";
import { checkUserLogged } from "../server/User/auth";

export default function changeVisibilityAuthElements() {
    const authUser = checkUserLogged();
    const hiddenElement = $("[data-auth-user]");
    const showElement = $("[data-logged-user]");
    setTimeout(()=>{
        if (authUser) {
            showElement?.classList.add("flex");
            showElement?.classList.remove("hidden");
        } else {
            hiddenElement?.classList.remove("hidden");
            hiddenElement?.classList.add("flex");
        }

        $("#loader").classList.add("hidden");
    }, 200)
    
}