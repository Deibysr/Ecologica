import type { User } from "./User"

export interface Message {
    User: User,
    userId: string,
    id: string,
    content: string,
    timeStamp: Date,
    forumId: string,
    self:boolean
}

export interface DisplayMessage {
    id: string,
    userName: string,
    content: string,
    self: boolean
}