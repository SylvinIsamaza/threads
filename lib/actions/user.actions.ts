"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

import { connectDb } from "../mongoose";
import thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import user from "../models/user.model";
interface Params {
  userId: string;
  username: string;
  image: string;
  path: string;
  name: string;
  bio: string;
}
export async function updateUser({
  userId,
  username,
  image,
  path,
  name,
  bio,
}: Params): Promise<void> {
  connectDb();
  console.log(userId)
  const id=userId
  try {
    await User.findOneAndUpdate({userId:id},
      {
        username: username.toLowerCase(),
        image,
        bio,
        name,
        onBoarded: true,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create or update ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  console.log('USER ID'+userId)
  try {
    return await User.findOne({ userId: userId })
    //   .populate({
    //   path: "communities",
    //   model:"Community"
    // })
  } catch (error:any) {
    throw new Error(`Failed to fetch User due to ${error.message}`)
  }
}
export async function fetchUserPosts(userId: string) {
  try {
    connectDb();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ userId: userId }).populate({
      path: "threads",
      model: thread,
      populate: [
        // {
        //   path: "community",
        //   model: Community,
        //   select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        // },
        {
          path: "children",
          model: thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}



// Almost similar to Thead (search + pagination) and Community (search + pagination)

export async function fetchUsers({ userId, searchString, pageNumber=1, pageSize=20, sortBy = "desc" }: {
  userId: string,
  searchString: string,
  pageNumber?: number,
  pageSize?: number,
  sortBy?:SortOrder
}) {
  connectDb()
  const skipAmount = (pageNumber - 1) * pageSize;
  const regex = new RegExp(searchString, "i")
  const query:FilterQuery<typeof User> = {
    id:{$ne:userId}
  }
  if (searchString?.trim() != "") {
    query.$or = [
      {
        username:{$regex:regex}
      },
      {
        name:{$regex:regex}
      }

    ]
  }
  const sortOption = { createdAt: sortBy }
  const usersQuery = User.find(query).sort(sortOption).skip(skipAmount).limit(pageSize)
  const totalUserCount = await User.countDocuments(query)
  const users = await usersQuery.exec()
  const isNext = totalUserCount > skipAmount + users.length
  
  return {isNext,users}
  try {
    
  } catch (error:any) {
    throw new Error(`failed to search due to ${error.message}`)
  }
}