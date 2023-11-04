import React from "react";

const PostCard = ({ authorName, authorAvatar, date, title, content, tags }) => {
  return (
    <div className="m-8 p-4 border-black border-solid border-2 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="user-details flex gap-x-0.5 items-center">
          <div className="profile-pic m-2 p-4 w-24">
            <img
              className="rounded-full aspect-square"
              src={authorAvatar}
              alt="author-avatar"
            ></img>
          </div>
          <p className="text-2xl">{authorName}</p>
        </div>
        <p className="m-2">{date}</p>
      </div>
      <p className="text-xl m-2">{title}</p>
      <p className="m-2 text-justify">{content}</p>
    </div>
  );
};

export default PostCard;
