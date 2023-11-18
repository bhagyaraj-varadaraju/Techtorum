import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const FollowProfile = ({ user, api_url }) => {
  //get logged in user username
  const { user: loggedInUser } = useContext(UserContext);
  const loggedInUsername = loggedInUser.username;
  const { username, avatarurl } = user;
  const handleFollow = async () => {
    const res = await fetch(
      `${api_url}/api/users/` + loggedInUsername + "/follow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followed_username: username,
        }),
      }
    );
    const data = await res.json();
    window.location.reload();
  };

  return (
    <div>
      <div className="flex items-center m-6 bg-gray-200 rounded-lg">
        <Link className="flex items-center p-0 w-9/12" to={"/" + username}>
          <img
            className="m-1 p-2 w-3/12 aspect-square rounded-full"
            src={avatarurl}
            alt="profile-pic"
          ></img>
          <div className="m-2 max-w-9/12 user-details flex flex-col">
            <h1 className="text-large">{username}</h1>
          </div>
        </Link>
        <button
          className="p-2 m-2 bg-gray-800 font-bold text-white rounded-lg"
          onClick={handleFollow}
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default FollowProfile;
