import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const followings = ({ userName, api_url }) => {
  const [following, setfollowing] = useState([]);
  const [showfollowing, setShowfollowing] = useState(false);

  useEffect(() => {
    const fetchfollowing = async () => {
      const res = await fetch(
        `${api_url}/api/users/` + userName + "/following"
      );
      const data = await res.json();
      setfollowing(data.following);
    };

    fetchfollowing();
  }, [userName]);

  return (
    <div className="followings w-2/12 flex flex-col text-center ">
      <div onClick={() => setShowfollowing(true)}>
        <p className="text-xl font-semibold">Following</p>
        <p>{following.length}</p>
      </div>
      {showfollowing ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-1/3 h-1/2 p-8 m-8 bg-gray-400 rounded-lg">
            <p className="text-2xl font-semibold m-4">Following</p>
            {following.map((following) => (
              <Link
                key={following.username}
                className="flex items-center m-4 h-min bg-gray-200 rounded-lg"
                to={"/" + following.username}
                onClick={() => setShowfollowing(false)}
              >
                <img
                  className="m-1 p-6 w-3/12 aspect-square rounded-full"
                  src={following.avatarurl}
                  alt="profile-pic"
                ></img>
                <div className="m-2 max-w-9/12 user-details flex flex-col">
                  <h1 className="text-large">{following.username}</h1>
                </div>
              </Link>
            ))}
            <button
              onClick={() => setShowfollowing(false)}
              className="bg-gray-800 text-white rounded-lg px-2 py-1"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default followings;
