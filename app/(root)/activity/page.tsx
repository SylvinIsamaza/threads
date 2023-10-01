import UserCard from "@/components/card/UserCard";
import {
  fetchUser,
  fetchUsers,
  getActivities,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo.onBoarded) return redirect("/onboarding");
  console.log(userInfo);
  const activities = await getActivities(userInfo._id);
  console.log(activities);
  return (
    <section>
      <h1 className="head-text mb-10">
        Activity 
      </h1>
      <section className="mt-10 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <div className="w-11 h-11 relative">
                  <Image src={activity.author.image} fill className="rounded-full object-cover" alt="profile-photo" />

                  </div>
                  <p className=" text-light-1"><span className="mr-2">{activity.author.name}</span>Replied to your thread</p>
                </article>
              </Link>
            ))}
          </>
        ) : (<p className="!text-base-regular text-gray-2">
            No activities yet
        </p>
        )}

      </section>
    </section>
  );
};

export default Page;
