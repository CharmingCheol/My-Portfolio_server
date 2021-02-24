import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export default () => {
  if (process.env.NODE_ENV !== "test") {
    mongoose
      .connect(
        `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.iwkbq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
      )
      .then(() => console.log("mongoDB connected"))
      .catch((err) => console.error(err));
  }
};
