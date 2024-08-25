import express from "express";
import { twitRouter } from "./src/twit/twit.controller.js";

const app = express();

async function main() {
  app.use(express.json());

  app.use("/api/twits", twitRouter);

  app.all("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  app.listen(3021, () => {
    console.log("Server is running");
  });
}

main();
