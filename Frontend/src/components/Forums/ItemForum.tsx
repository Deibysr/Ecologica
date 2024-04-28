import getTokenFromSession from "@/helpers/getTokenFromSession";
import useAuth from "@/hooks/useAuth";
import deleteForum from "@/server/Forum/deleteForum";
import {toast} from "sonner";

interface Props {
    title: string;
    description: string;
    id: number
};

export default function ItemForum({ title, description, id }: Props) {
    const {isAdmin} = useAuth();

    const handleDelete = async () => {
        const confirmUser = confirm("¿Estás seguro de que quieres elminar este foro?");
        if(!confirmUser) return;
        const token = getTokenFromSession();
        if(!token) return;
        const forumDelete = await deleteForum(String(id), token);
        console.log(forumDelete)
        if(forumDelete.msg) toast.success("El foro se ha eliminado correctamente.");
        else toast.error("Fatal, hubo un error al tratar de elminar el foro.");
        
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <div className="relative">
            {
                isAdmin &&
                <button onClick={handleDelete} className="text-red-500 absolute top-2 right-2 z-99 hover:scale-[1.1] transition-transform cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                    </svg>
                </button>

            }
            
            <a href={`/foros/${title}`}>
                <div className="w-full h-[90px] text-base rounded-2xl bg-white p-3 flex justify-between gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-[75px]">
                            <img
                                src="/img/mundi.jpg"
                                alt="Planeta Tierra"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold">{title}</h3>
                            <p className="text-gray-800 text-sm hidden lg:block">{description}</p>
                        </div>
                    </div>
                    <div className="text-sm flex flex-col gap-2 justify-center items-center">
                        {/* <span>14:20</span> */}
                    </div>
                </div>
            </a>
        </div>
    );
}

