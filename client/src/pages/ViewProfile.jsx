import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";

const ViewProfile = () => {
  const { logout } = useContext(UserContext);
  const { userName } = useParams();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [bio, setBio] = useState("Put your bio here!");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await fetch("/api/users/" + userName);
      const data = await res.json();

      setProfilePic(data.avatarurl);
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

  const handleDeleteProfile = async () => {
    const res = await fetch("/api/users/" + userName, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    logout();
  };

  return (
    <div className="w-[60%] m-auto">
      <div className="header flex justify-around items-center gap-2">
        <img
          className="m-1 p-3 w-[25%] aspect-square rounded-full"
          src={profilePic}
          alt="profile-pic"
        ></img>
        {/* </div> */}
        <div className="m-2 user-details flex flex-col">
          <h1 className="text-2xl">{userName}</h1>
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
          <Link to={"./edit"}>
            <button className="py-2 px-4 ml-2 my-2 bg-gray-800 text-white rounded-lg">
              Edit Profile
            </button>
          </Link>
        </div>
        <div>
          <button
            className="py-2 px-4 ml-2 my-2 bg-gray-800 text-white rounded-lg"
            onClick={handleDeleteProfile}
          >
            Delete Profile
          </button>
        </div>
      </div>
      <div className="posts w-[100%]">
        <p className="text-4xl text-center">Posts</p>
        {posts.length == 0 ? (
          <p className="text-4xl text-center my-16 mx-auto p-4">
            No posts yet 🙁
          </p>
        ) : (
          posts?.map((post) => (
            <PostCard
              key={post.id}
              authorName={userName}
              authorAvatar={profilePic}
              date={post.created_on.slice(0, 10)}
              title={post.title}
              content={post.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
