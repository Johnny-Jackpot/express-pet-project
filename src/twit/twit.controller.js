import { Router } from "express";
import { TwitService } from "./twit.service.js";

export const twitRouter = Router();

const twitService = new TwitService();

twitRouter.post("/", (req, res) => {
  const twit = twitService.createTwit(req.body);
  return res.status(201).json(twit);
});
