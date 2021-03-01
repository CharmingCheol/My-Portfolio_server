import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import models from "@models/index";
import routes from "@routes/api";
import { internelServerErrorHandler } from "@utils/errorHandler";

dotenv.config();
const { PORT } = process.env;

const app: express.Application = express();

models();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);
app.use(internelServerErrorHandler);

app.get("/", (_, res) => {
  res.send("서버 동작 확인");
});

app.listen(PORT || 3001, () => console.log(`server listening ${PORT || 3001} port`));

export default app;
