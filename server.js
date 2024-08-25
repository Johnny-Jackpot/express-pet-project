import express from "express";
import { twitRouter } from "./src/twit/twit.controller.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

async function main() {
  app.use(express.json());

  app.use("/api/twits", twitRouter);

  app.all("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  const port = process.env.PORT ?? 4200;

  app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
  });
}

main();
