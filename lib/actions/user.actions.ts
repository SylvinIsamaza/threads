"use server";
import { revalidatePath } from "next/cache";
import User from "../mongoose";

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
  try {
    await User.findByIdAndUpdate(
      { id: userId },
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