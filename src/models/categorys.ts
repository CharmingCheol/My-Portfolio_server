import mongoose from "mongoose";

const CategorysSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    }
  }
);

const Categorys = mongoose.model("Categorys", CategorysSchema);

export default Categorys;