import { Channel } from "@prisma/client";
import { IMessage, IUser } from "./types";

export interface ServerToClientEvents {
    serverBroadcastsUserConnected: (userId: number) => void;
    serverBroadcastsUserDisconnected: (userId: number) => void;

    serverBroadcastsUserJoin: (user: IUser, channel: Channel) => void;
    serverBroadcastsUserLeave: (user: IUser, channel: Channel) => void;

    serverBroadcastsUserSentMessage: (message: IMessage) => void;
}

export interface ClientToServerEvents {
    userConnected: (userId: number) => void;
    userDisconnected: (userId: number) => void;

    userJoined: (user: IUser, channelId: number) => void;
    userLeft: (user: IUser, channelId: number) => void;

    userSendsMessage: (message: IMessage) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: IUser
}
