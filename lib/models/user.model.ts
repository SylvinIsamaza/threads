import mongoose, { mongo } from "mongoose";

const userSChema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required:true
  },
  name: {
    type: String,
    required:true,
  },
  id: {
    type: String,
    required:true
  },
  image: {
    type: String,
    
  },
  bio: {
    type:String,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"thre"
    }
  ],
  obBoarded: {
    type: String,
    default:false
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Communities"
    }
  ]
})
const user=mongoose.models.User||mongoose.model('user',userSChema)
