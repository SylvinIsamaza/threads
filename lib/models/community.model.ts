import mongoose, { mongo } from "mongoose";

const userSChema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  members:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thread",
    },
  ],
  onBoarded: {
    type: String,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});
const user = mongoose.models.communities || mongoose.model("communities", userSChema);
export default user;
