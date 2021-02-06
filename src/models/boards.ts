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
    created_at: {
      type: Date,
    },
    hashtag: {
      type: [String],
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
