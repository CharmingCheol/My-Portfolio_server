import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DEV_DB_USERNAME, DEV_DB_PASSWORD, DEV_DB_NAME, NODE_ENV } = process.env;

beforeEach(async () => {
  if (NODE_ENV === "test") {
    await mongoose
      .connect(
        `mongodb+srv://${DEV_DB_USERNAME}:${DEV_DB_PASSWORD}@cluster0.iwkbq.mongodb.net/${DEV_DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
      )
      .catch((e) => console.error(e));
  }
});
