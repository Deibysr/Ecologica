export interface CreateMessageRequest {
    forumId: number;
    content: string;
}

export interface Message {
    userID: string,
    userName: string,
    id: string,
    content: string,
    timeStamp: Date,
    foroId: string,
    self: boolean
}

export interface DisplayMessage {
    id: string,
    userName: string,
    content: string,
    self: boolean
}