import getRole from "@/helpers/getRole";
import { useEffect, useState } from "react";

export default function useAuth(){
    const [isAdmin, setIsAdmin] = useState(false);  

    useEffect(()=>{
        const currentRolUser = getRole()?.admin;
        setIsAdmin(currentRolUser ?? false);
    }, []);

    return {isAdmin};
}