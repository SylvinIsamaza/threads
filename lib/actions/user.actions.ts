"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

import { connectDb } from "../mongoose";
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