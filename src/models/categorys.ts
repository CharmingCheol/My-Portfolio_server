import mongoose, { Document } from "mongoose";

interface CategorysType extends Document {
  category: string;
  count: number;
}

const CategorysSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
  },
});

const Categorys = mongoose.model<CategorysType>("Categorys", CategorysSchema);

export default Categorys;
