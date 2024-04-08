// MessageComponent.tsx

type MessageComponentProps = {
    content: string;
    userName: string;
    self: boolean;
};

const MessageComponent = ({ content, userName, self }: MessageComponentProps) => {
    const styleJoin = "p-2 rounded-3xl px-4"
    const styleSelf = `${styleJoin} bg-ecologica-secondary text-white`
    const styleNoSelf = `${styleJoin} bg-gray-200`

    return (
        <div className={`${self ? "self-end" : " self-start" } flex item-center gap-4 min-w-[120px] max-w-[50%]`}>
            { !self && <div className={`flex flex-col justify-center`}>
                <img width={30} src="https://th.bing.com/th/id/R.8e2c571ff125b3531705198a15d3103c?rik=gzhbzBpXBa%2bxMA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-big-image-png-2240.png&ehk=VeWsrun%2fvDy5QDv2Z6Xm8XnIMXyeaz2fhR3AgxlvxAc%3d&risl=&pid=ImgRaw&r=0" alt="UserID" />
                <p className="text-xs text-center max-w-8">{userName}</p>
            </div>}
            <div className={`${self ? styleSelf : styleNoSelf}`}>
                
                <p>{content}</p>
                
            </div>
        </div>
    );
};

export default MessageComponent;
