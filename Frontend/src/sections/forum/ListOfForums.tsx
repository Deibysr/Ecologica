import CreateForumForm from "@/components/Forums/CreateForumForm";
import ItemForum from "@/components/Forums/ItemForum";
import useAuth from "@/hooks/useAuth";
import type { Forum } from "@/interfaces/Forum";
import { useState } from "react";
import { Toaster } from "sonner";



export default function ListOfForums({forums}: {forums:Forum[]}){
    const {isAdmin} = useAuth();
    const [openForm, setOpenForm] = useState(false);

    const handleOpen =()=>{
        setOpenForm(!openForm);
    };
    
    return(
        <section
            id="forum-section"
            className="pb-3 lg:pb-0 flex flex-row overflow-x-scroll lg:overflow-x-hidden lg:flex-col gap-3 mt-10 flex-[0.6]">
            {
                isAdmin &&
                <>
                    <button onClick={handleOpen} className="hover:bg-emerald-600 w-full bg-green-600 text-white p-3 rounded-xl font-medium flex justify-center items-center gap-2">
                        Crear foro
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                            </svg>
                        </span>
                    </button>
                    <CreateForumForm open={openForm}/>
                </>
            }

            {
                forums.length > 0 ? 
                forums.map((forum) => (
                    <ItemForum
                        key={forum.id}
                        title={forum.title}
                        description={forum.description}
                        id={forum.id as number}
                    />
                ))
                : <p className="font-bold text-center w-full text-sm">Todavía no hay ningún foro...</p>
            }
            <Toaster richColors position="bottom-left" expand={true}/>
        </section>
    );
};

