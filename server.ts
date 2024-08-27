import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { twitRouter } from "@/twit/twit.controller";
import { PrismaClient } from "@prisma/client";
import { logger } from "./src/utils/log";
import helmet from "helmet";

dotenv.config();

const app = express();

const prisma = new PrismaClient();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(helmet());
app.use(express.json());
app.use("/api/twits", twitRouter);
app.get("/profile", (req: Request, res: Response) => {
  res.render("profile", {
    user: {
      name: "John",
      age: 23,
    },
  });
});
app.get("/error", (req: Request, res: Response, next) => {
  throw new Error("Example error");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).json({ message: "something wend wrong" });
});

const port = process.env.PORT ?? 4200;

app.listen(port, () => {
  logger.info(`Server is running at: http://localhost:${port}`);
});

prisma.$connect().catch(async (e) => {
  logger.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
