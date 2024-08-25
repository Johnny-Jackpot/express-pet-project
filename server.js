import express from "express";

const app = express();

async function main() {
  app.use(express.json());

  app.get("/api/twit", (req, res) => {
    res
      .json({
        message: "success",
      })
      .status(200);
  });

  app.listen(3021, () => {
    console.log("Server is running");
  });
}

main();
