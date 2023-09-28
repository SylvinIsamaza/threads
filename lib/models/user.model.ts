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
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "thre",
    },
  ],
  onBoarded: {
    type: String,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Communities",
    },
  ],
});
const user = mongoose.models.user || mongoose.model("user", userSChema);
export default user;
