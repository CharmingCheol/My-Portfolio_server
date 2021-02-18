import express from "express";
import morgan from "morgan";
import cors from "cors";
import models from "@models/index";
import routes from "@routes/api";
import { internelServerErrorHandler } from "@utils/errorHandler";

const app: express.Application = express();

models();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);
app.use(internelServerErrorHandler);

app.listen(3001, () => console.log("server listening 3000 port"));

export default app;
