
import MessageComponent from "../../components/MessageComponent"
import { Send } from "../../icons/Send"
import type { DisplayMessage } from "../../interfaces/Message"

interface Props {
    title: string
    msgs: DisplayMessage[]
}

export default function ForumChat({title, msgs}: Props){
    return (
        <section className="flex-1 p-3 min-h-[80vh] ">
            <h3 className="font-bold m-2 pb-6 border-b border-b-gray-300">{title}</h3>
            <div className="flex flex-col justify-between h-[90%]">    
                <div className="flex flex-col gap-4">
                    {msgs.map((msg) => (
                        <MessageComponent
                            key={msg.id}
                            content={msg.content}
                            userName={msg.userName}
                            self={msg.self}
                        />
                    ))}
                </div>
                <div>
                    <label className="w-full flex gap-2 bg-white px-2  items-center">
                        <input className="w-full py-3 pl-2 focus:outline-none focus:bg-gray-100"
                            type="text"
                            id="messageInput" 
                            placeholder="Escribe un mensaje..." 
                            title="Campo para escribir mensajes"
                        />
                        <span className="w-8 flex justify-center items-center text-white bg-sky-400 rounded-full h-8">
                            <Send/>
                        </span>
                    </label>
                </div>
            </div>
        </section>
    )
}