import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Followers = ({ userName, api_url }) => {
  const [followers, setFollowers] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      const res = await fetch(
        `${api_url}/api/users/` + userName + "/followers"
      );
      const data = await res.json();
      setFollowers(data.followers);
    };

    fetchFollowers();
  }, [userName]);

  return (
    <div className="followers w-2/12 flex flex-col text-center ">
      <div onClick={() => setShowFollowers(true)}>
        <p className="text-xl font-semibold">Followers</p>
        <p>{followers.length}</p>
      </div>
      {showFollowers ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-1/3 h-1/2 p-8 m-8 bg-gray-400 rounded-lg">
            <p className="text-2xl font-semibold m-4">Followers</p>

            {followers.map((follower) => (
              <Link
                key={follower.username}
                className="flex items-center m-4 h-min bg-gray-200 rounded-lg"
                to={"/" + follower.username}
                onClick={() => setShowFollowers(false)}
              >
                <img
                  className="m-1 p-6 w-3/12 aspect-square rounded-full"
                  src={follower.avatarurl}
                  alt="profile-pic"
                ></img>

                <div className="m-2 max-w-9/12 user-details flex flex-col">
                  <h1 className="text-large">{follower.username}</h1>
                </div>
              </Link>
            ))}

            <button
              className="bg-gray-800 text-white rounded-lg p-2 m-2"
              onClick={() => setShowFollowers(false)}
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

export default Followers;
