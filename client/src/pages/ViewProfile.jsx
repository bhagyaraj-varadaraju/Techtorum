import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

const ViewProfile = () => {
  const { userName } = useParams();

  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [bio, setBio] = useState("Put your bio here!");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await fetch("/api/users/" + userName);
      const data = await res.json();
      console.log(data);
      setProfilePic(data.avatar_url);
      setBio(data.bio);
    };

    const fetchUserPosts = async () => {
      const res = await fetch("/api/users/" + userName + "/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchUserDetails();
    fetchUserPosts();
  }, []);

  return (
    <div className="w-[60%] m-auto">
      <div className="header flex justify-around items-center">
        <div className="profile-pic m-2 p-4 w-32">
          <img
            className="aspect-square rounded-full"
            src={profilePic}
            alt="profile-pic"
          ></img>
        </div>
        <div className="user-details w-[40%] flex flex-col">
          <h1 className="text-3xl">{userName || "User Name"}</h1>
          <p>{bio}</p>
        </div>
        <div className="followers flex flex-col text-center ">
          <p>Followers</p>
          <p>21</p>
        </div>
        <div className="following flex flex-col text-center">
          <p>Following</p>
          <p>20</p>
        </div>
        <div>
          <Link to={"/account/edit"}>
            <button className="py-2 px-4 mx-4 my-2 bg-gray-800 text-white rounded-lg">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
      <div className="posts w-[100%]">
        <p className="text-3xl text-center">Posts</p>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            authorName={userName}
            authorAvatar={profilePic}
            date={post.created_on.slice(0, 10)}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewProfile;
