// MessageComponent.tsx

type MessageComponentProps = {
    content: string;
    userName: string;
    self: boolean;
};

const MessageComponent = ({ content, userName, self }: MessageComponentProps) => {
    const styleJoin = "p-2 rounded-3xl px-4 border"
    const styleSelf = `${styleJoin} bg-ecologica-secondary text-white`
    const styleNoSelf = `${styleJoin} bg-gray-200 mt-5`

    return (
        <div className={`${self ? "self-end" : " self-start" } flex item-center`}>
            { !self && 
                <div className={`flex flex-col justify-center relative`}>
                    <p className="text-xs text-center text-gray-700 w-20 absolute top-0 left-0">{userName}</p>
                </div>
            }
            <div className={`${self ? styleSelf : styleNoSelf}`}>
                <p>{content}</p>  
            </div>
        </div>
    );
};

export default MessageComponent;
