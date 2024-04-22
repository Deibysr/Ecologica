import MessageComponent from "../../components/Forums/MessageComponent"
import { Send } from "../../icons/Send"
import type { DisplayMessage } from "../../interfaces/Message"

interface Props {
    forumId:number
}

const forums = [
    {id: 1, title: "Academia Universitaria", description: "Foro sobre blah blah", messages: []}
];

export default function ForumChat({forumId}: Props){
    const currentForum = forums.find(forum=> forum.id === forumId);

    return (
        <section className="flex-1 mt-6 min-h-[80vh] ">
            <div className="border-b border-b-gray-300 pb-3">
                <h3 className="font-bold">{currentForum?.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{currentForum?.description}</p>
            </div>
            <div className="flex flex-col justify-between h-[600px] lg:h-[90%]">    
                <div className="flex flex-col gap-6">
                    {/* {msgs.map((msg) => (
                        <MessageComponent
                            key={msg.id}
                            content={msg.content}
                            userName={msg.userName}
                            self={msg.self}
                        />
                    ))} */}
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