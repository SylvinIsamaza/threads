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
}: params) => {
  
  return (
    <article>
      <h2 className="text-small-regular text-light-2">{content}</h2>
    </article>
  );
};

export default ThreadCard;
