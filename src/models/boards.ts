import mongoose, { Document } from "mongoose";

interface BoardsType extends Document {
  body: string;
  category: string;
  hashtag: string[];
  thumbnail: string;
  title: string;
}

const BoardsSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    hashtag: {
      type: [String],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } },
);

const Boards = mongoose.model<BoardsType>("Boards", BoardsSchema);

export default Boards;
