import { Router } from "express";
import { TwitService } from "./twit.service";
import {authMiddleware} from "../auth.middleware";

export const twitRouter = Router();

const twitService = new TwitService();

twitRouter.post("/", authMiddleware, (req, res) => {
  const twit = twitService.createTwit(req.body);
  return res.status(201).json(twit);
});
