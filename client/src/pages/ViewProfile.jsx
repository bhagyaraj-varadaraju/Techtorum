import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import Followers from "../components/Followers";
import Following from "../components/Following";

const ViewProfile = ({ api_url }) => {
  const { user: loggedInUser, logout } = useContext(UserContext);
  const loggedInUsername = loggedInUser.username;
  const { userName } = useParams();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [bio, setBio] = useState("Put your bio here!");
  const [posts, setPosts] = useState([]);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await fetch(`${api_url}/api/users/` + userName);
      const data = await res.json();

      setProfilePic(data.avatarurl);
      setBio(data.bio);
    };

    const fetchUserPosts = async () => {
      const res = await fetch(`${api_url}/api/users/` + userName + "/posts");
      const data = await res.json();
      setPosts(data);
    };

    fetchUserDetails();
    fetchUserPosts();
  }, [userName]);

  useEffect(() => {
    const isFollowing = async () => {
      const res = await fetch(
        `${api_url}/api/users/` + loggedInUsername + "/following"
      );
      const data = await res.json();
      const followingUsernames = data.following.map((user) => user.username);
      return followingUsernames.includes(userName);
    };

    const updateIsFollowing = async () => {
      setIsFollowingUser(await isFollowing());
    };

    updateIsFollowing();
  }, []);

  const handleDeleteProfile = async () => {
    const res = await fetch(`${api_url}/api/users/` + userName, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    logout();
  };

  const handleFollow = async () => {
    const res = await fetch(
      `${api_url}/api/users/` + loggedInUsername + "/follow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followed_username: userName,
        }),
      }
    );
    const data = await res.json();
    window.location.reload();
  };

  const handleUnFollow = async () => {
    const res = await fetch(
      `${api_url}/api/users/` + loggedInUsername + "/follow",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followed_username: userName,
        }),
      }
    );
    const data = await res.json();
    window.location.reload();
  };

  return (
    <div className="w-[60%] m-auto">
      <div className="header flex justify-around items-center gap-2">
        <img
          className="m-1 p-3 w-2/12 aspect-square rounded-full"
          src={profilePic}
          alt="profile-pic"
        ></img>
        <div className="m-2 w-4/12 max-w-6/12 user-details flex flex-col">
          <h1 className="text-2xl font-semibold">{userName}</h1>
          <p>{bio}</p>
        </div>

        <Followers userName={userName} api_url={api_url} />
        <Following userName={userName} api_url={api_url} />

        {loggedInUsername == userName ? (
          <>
            <div>
              <Link to={"./edit"}>
                <button className="py-2 px-4 ml-2 my-2 bg-gray-800 font-bold text-white rounded-lg">
                  Edit Profile
                </button>
              </Link>
            </div>
            <div>
              <button
                className="py-2 px-4 ml-2 my-2 bg-gray-800 text-white font-bold rounded-lg"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </div>
          </>
        ) : (
          <div>
            <button
              className="py-2 px-4 ml-2 my-2 bg-gray-800 font-bold text-white rounded-lg"
              onClick={isFollowingUser ? handleUnFollow : handleFollow}
            >
              {isFollowingUser ? "UnFollow" : "Follow"}
            </button>
          </div>
        )}
      </div>
      <div className="posts w-[100%]">
        <p className="text-4xl text-center">Posts</p>
        {posts && posts.length == 0 ? (
          <p className="text-4xl text-center my-16 mx-auto p-4">
            No posts yet 🙁
          </p>
        ) : (
          posts.map((post, idx) => (
            <PostCard
              key={idx}
              postId={post.id}
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
