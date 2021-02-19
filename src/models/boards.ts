import mongoose from "mongoose";

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
  { timestamps: { createdAt: "created_at" } },
);

const Boards = mongoose.model("Boards", BoardsSchema);

export default Boards;
