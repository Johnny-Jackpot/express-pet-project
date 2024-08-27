import { Request, Response, Router } from "express";
import { TwitService } from "./twit.service";
import { authMiddleware } from "@/auth.middleware";
import { createTwitDto } from "@/twit/twit.dto";

export const twitRouter = Router();

const twitService = new TwitService();

twitRouter.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createTwitDto.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.errors });
  }

  const twit = await twitService.createTwit(req.body);
  return res.status(201).json(twit);
});

twitRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
  const twits = await twitService.getTwits();
  return res.status(200).json(twits);
});
