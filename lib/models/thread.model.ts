import mongoose, { mongo } from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    requied: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Communities",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "thread" }],
  parentId: { type: String },
});
const thread = mongoose.models.thread || mongoose.model("thread", threadSchema);
export default thread;
