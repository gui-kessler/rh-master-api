import express from "express";
import cors from "cors";
import apiRouter from "./src/api/apiRouter.js";

const app = express();
const PORT = 3000;

app.use("/api", cors(), express.json(), apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
