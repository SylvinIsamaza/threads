import Image from "next/image";
import Link from "next/link";
import React from "react";

interface params {
  id: string;
  currentUser: string;

  createdAt: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  parentId: string | null;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: [
    {
      author: {
        image: string;
      };
    }
  ];
  isComment: boolean;
  content: string;
}
const ThreadCard = ({
  id,
  currentUser,
  content,
  parentId,
  community,
  createdAt,
  comments,
  author,
  isComment
}: params) => {
  
  return (
    <article className="w-full flex flex-col bg-dark-2 p-7 rounded-xl">
      <div className="flex item-start justify-center">
        <div className="flex flex-1 flex-grow gap-4">
          <div className="flex items-center flex-col">
            <Link href={`profile/${author.id}`} className="relative h-11 w-11">
<Image src={author.image} alt="profile image" className="cursor-pointer rounded-full" fill/>
            </Link>
            <div className=" thread-card_bar"/>
          </div>
          <div className="flex flex-col w-full">
            <Link href={`profile/${author.id}`} className="w-fit ">
            <h4 className=" cursor-pointer text-base-semibold text-light-1 "> {author.name}</h4> 
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {content}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3 5">
                <Image src="/assets/heart-gray.svg" className="cursor-pointer object-contain" width={24} height={24} alt="heart" />
                <Link href={`thread/${id}`}>
                <Image src="/assets/reply.svg" className="cursor-pointer object-contain" width={24} height={24} alt="reply" />
                </Link>
                <Image src="/assets/repost.svg" className="cursor-pointer object-contain" width={24} height={24} alt="repost" />
                <Image src="/assets/share.svg" className="cursor-pointer object-contain" width={24} height={24} alt="heart"/>
              </div>
              {
                isComment && comments.length > 0 && (
                  <Link href={`thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} replies
                    </p>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
     
    </article>
  );
};

export default ThreadCard;
