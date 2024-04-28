import type { Forum } from "@/interfaces/Forum";
import { Send } from "../../icons/Send"
import { useState, type ChangeEvent, type FormEventHandler, useEffect } from "react";
import createMessage from "@/server/Message/createMessage";
import getTokenFromSession from "@/helpers/getTokenFromSession";
import type { Message } from "@/interfaces/Message";
import MessageComponent from "@/components/Forums/MessageComponent";
import getAllMessages from "@/server/Message/getAllMessages";
import { checkUserLogged } from "@/server/User/auth";
import type { User } from "@/interfaces/User";


export default function ForumChat({ currentForum }: { currentForum: Forum }) {
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUser, setCurrentUser] = useState<null | {user:User}>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const messageContent = event.target.value;
        setContent(messageContent);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const token = getTokenFromSession();
        if (!token) return;
        if(!content) return;
        const messageResult = await createMessage({
            forumId: String(currentForum.id),
            token,
            content
        }) as Message;

        messageResult.self = currentUser?.user ? messageResult.userId === currentUser?.user?.id : false;
        setMessages(prevMessages => [...prevMessages, messageResult]);
        setContent("");    
    };

    useEffect(() => {
        const userLogged = checkUserLogged();
        setCurrentUser(userLogged);
        const getMessages = async () => {
            const allMessages = await getAllMessages(String(currentForum?.id)) as Message[];
            const mapMessages = allMessages.map(message => {
                message.self = userLogged?.user ? message.userId === userLogged?.user?.id : false;
                return message;
            });
            setMessages(mapMessages);
        };
        getMessages();
    }, []);

    return (
        <section className="flex-1 mt-6 min-h-[80vh] ">
            <div className="border-b border-b-gray-300 pb-3">
                <h3 className="font-bold">{currentForum?.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{currentForum?.description}</p>
            </div>
            <div className="flex flex-col justify-between h-auto lg:h-[90%]">
                <div className="flex flex-col gap-3 p-3 h-full max-h-[650px] overflow-y-scroll">
                    {
                    messages.length > 0 ?
                        messages.map((msg) => (
                            <MessageComponent
                                key={msg.id}
                                content={msg.content}
                                userName={msg.User.name}
                                self={msg.self}
                            />
                        ))
                        :
                        <p className="font-semibold text-center text-sm">Todavía no hay mensajes... ¡Sé el primero en escribir!</p>
                    }
                </div>
                {
                    currentUser ?
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <label className="w-full flex gap-2 bg-white px-2 items-center rounded-lg">
                                <input onChange={handleChange} value={content} className="w-full py-3 pl-2 focus:outline-none"
                                    type="text"
                                    id="messageInput"
                                    placeholder="Escribe un mensaje..."
                                    title="Campo para escribir mensajes"
                                />
                                <button className="w-8 flex justify-center items-center text-white bg-sky-400 rounded-full h-8">
                                    <Send />
                                </button>
                            </label>
                        </form>
                    : <div className="w-full font-bold text-center bg-gray-200 p-4 rounded-lg">
                        <p>¿Quieres participar en la conversación?
                            <a className="text-blue-500 hover:opacity-80" href="/usuario/login"> ¡Inicia Sesión!</a>
                        </p>
                    </div>
                }

            </div>
        </section>
    )
}