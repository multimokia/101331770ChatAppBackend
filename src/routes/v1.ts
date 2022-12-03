import { userRouter } from "./v1/user";
import { channelsRouter } from "./v1/channels";
import { Router } from "express";
import { inviteRouter } from "./v1/invites";

const v1Router = Router();
v1Router.use("/users", userRouter);
v1Router.use("/channels", channelsRouter);
v1Router.use("/invite", inviteRouter);
export { v1Router };
