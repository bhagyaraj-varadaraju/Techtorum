import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ postId, authorName, authorAvatar, date, title, content }) => {
  return (
    <div className="m-8 p-4 border-black border-solid border-2 rounded-xl">
      <div className="flex justify-between items-center">
        <Link to={"/" + authorName} className="user-details flex gap-x-0.5 items-center">
          <div className="profile-pic m-2 p-4 w-24">
            <img
              className="rounded-full aspect-square"
              src={authorAvatar}
              alt="author-avatar"
            ></img>
          </div>
          <p className="text-2xl">{authorName}</p>
        </Link>
        <p className="m-2">{date}</p>
      </div>
      <Link to={"/" + authorName + "/post/" + postId}>
        <p className="text-xl m-2">{title}</p>
        <p className="m-2 text-justify">{content}</p>
      </Link>
    </div>
  );
};

export default PostCard;
