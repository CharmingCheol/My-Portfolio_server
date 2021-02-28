import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const {
  DEV_DB_USERNAME,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
  NODE_ENV,
} = process.env;

export default () => {
  if (NODE_ENV !== "test") {
    mongoose
      .connect(
        NODE_ENV === "dev"
          ? `mongodb+srv://${DEV_DB_USERNAME}:${DEV_DB_PASSWORD}@cluster0.iwkbq.mongodb.net/${DEV_DB_NAME}?retryWrites=true&w=majority`
          : `mongodb+srv://${PROD_DB_USERNAME}:${PROD_DB_PASSWORD}@cluster0.tsfq4.mongodb.net/${PROD_DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
      )
      .then(() => console.log("mongoDB connected"))
      .catch((err) => console.error(err));
  }
};
