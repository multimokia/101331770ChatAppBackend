import { Channel, ChannelUserAdditionalProps, Message, User } from "@prisma/client";

export interface IUser {
    id: number
    email: string
    username: string
    password: string
    avatarB64: string
    channels: Channel[]
    messages: Message[]
    channelMemberProps: ChannelUserAdditionalProps[]
}

export interface IChannel {
    id: number
    name: string
    members: User[]
    messages: Message[]
    channelMemberProps: ChannelUserAdditionalProps[]
}

export interface IChannelUserAdditionalProps {
    id: number
    nickname: string

    userId: number
    user: User

    channelId: number
    channel: Channel
}

export interface IMessage {
    id: number
    content: string
    isEdited: boolean
    timeSent: Date

    authorId: number
    author: User

    channelId: number
    channel: Channel
}

export type EditableUserData = {
    username?: string
    password?: string
    avatarB64?: string
}
