"use server"
import { revalidatePath } from "next/cache"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { connectDb } from "../mongoose"
interface params{
  text: string,
  communityId: any,
  path: string,
  author:string
}
export async function createThread({ text, author, communityId, path }: params) {
  connectDb()
  const user=await User.findOne({userId:author})
try {
  const createdThread=await Thread.create({
    text,
    author:user,
    communities:null
 })
  await User.findOneAndUpdate({
    userId:author
  },
    {
      $push: {
        threads: createdThread._id
      }
    }
  )
revalidatePath(path)
} catch (error:any) {
  throw new Error(`Error creating thread ${error.message }`)
}
}

export async function fetchPost(pageNumber = 1, pageSize = 20) {
  connectDb()
  const skipAmount = (pageNumber - 1) * pageSize
  const postsQuery = Thread.find(
    { parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    // .populate({
    //   path: "community",
    //   model: Community,
    // })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  }); // Get the total count of posts

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}