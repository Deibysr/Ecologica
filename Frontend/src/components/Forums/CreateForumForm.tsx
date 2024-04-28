import getTokenFromSession from "@/helpers/getTokenFromSession";
import createForum from "@/server/Forum/createForum";
import { useState, type ChangeEvent, type FormEventHandler} from "react";
import {toast} from "sonner";

export default function CreateForumForm({open}:{open:boolean}){
    const [forumData, setForumData] = useState({title:"", description:""});

    const handleChange=(event: ChangeEvent<HTMLInputElement>)=>{
        if(!event.target) return;
        const {value, name} = event.target;
        setForumData(forumData=> ({
            ...forumData,
            [name]: value
        }))
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event)=>{
        event.preventDefault();
        const token = getTokenFromSession();
        if(!token) return;
        const resultForum = await createForum(token, forumData);
        console.log(resultForum)
        if(resultForum){
            toast.success("El foro se ha creado correctamente");
        }else{
            toast.error("Hubo algún problema para crear el foro...");
        }
        setTimeout(() => {
            window.location.reload();            
        }, 2100);
    }

    return(
        <form
            onSubmit={handleSubmit} 
            className="flex flex-col gap-2 my-3 items-start"
            style={{
                height: `${open ? "220px" : "0"}`,
                overflow: "hidden",
                transition: "all .2s"
            }}
            >
            <label className="w-full">
                <p className="block font-semibold">Título...</p>
                <input onChange={handleChange} name="title" className="p-3 w-full rounded-lg" type="text" placeholder="Escribe el título del foro..."/>
            </label>
            <label className="w-full">
                <p className="block font-semibold">Descripción...</p>
                <input onChange={handleChange} name="description" className="p-3 w-full rounded-lg" type="text" placeholder="Escribe la descripción del foro..."/>
            </label>
            <button className="bg-green-700 p-2 px-6 mt-3 rounded-lg text-white font-semibold">Listo</button>
        </form>
    );
} 