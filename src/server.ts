import { Server } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./events.js";
import express from "express";
import { createServer } from "http";
import { PrismaClient } from "@prisma/client";

import { v1Router } from "./routes/v1.js";

export const prisma = new PrismaClient();
export const API_SECRET = process.env.API_SECRET;

const app = express();
app.use("/api/v1", v1Router);

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    httpServer,
    { cors: { origin: "exp://23.133.249.130:19000" }}
);

io.on("connection", (socket) => {
    socket.on("userJoined", (user, channelId) => {
        prisma.channel.findUniqueOrThrow({ where: { id: channelId }})
            .then((channel) => {
                console.log(`User ${user.username} joined ${channel.name}`);
                socket.join(channel.id.toString());
                socket.to(channel.id.toString()).emit("serverBroadcastsUserJoin", user, channel);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    socket.on("userSendsMessage", (message) => {
        prisma.message.create({
            data: {
                content: message.content,
                isEdited: message.isEdited,
                timeSent: message.timeSent,
                authorId: message.authorId,
                channelId: message.channelId
            },
            include: { channel: true, author: true }
        })
            .then((savedMessage) => {
                io.to(message.channelId.toString()).emit("serverBroadcastsUserSentMessage", savedMessage);
                console.log(`[${savedMessage.author.username} @ ${savedMessage.channel.name}]: ${savedMessage.content}`);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    socket.on("userLeft", (user, channelId) => {
        prisma.channel.findUniqueOrThrow({ where: { id: channelId }})
            .then((channel) => {
                console.log(`User ${user.username} left ${channel.name}`);
                socket.leave(channel.id.toString());
                socket.to(channel.id.toString()).emit("serverBroadcastsUserLeave", user, channel);
            })
            .catch((err) => {
                console.error(err);
            });
    });
});

httpServer.listen(9999, () => console.log("Server listening on port 9999"));

export { io };
