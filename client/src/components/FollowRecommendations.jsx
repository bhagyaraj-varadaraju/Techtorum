import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import FollowProfile from "./FollowProfile";

const FollowRecommendations = ({ api_url }) => {
  const { user } = useContext(UserContext);
  const userName = user.username;

  const [followRecommendations, setFollowRecommendations] = useState([]);

  useEffect(() => {
    const fetchFollowRecommendations = async () => {
      const res = await fetch(
        `${api_url}/api/users/` + userName + "/follow-recommendations"
      );
      const data = await res.json();
      setFollowRecommendations(data.recommendations);
    };

    fetchFollowRecommendations();
  }, []);

  return (
    <div>
      <p className="font-bold text-xl">Suggested for you</p>
      {followRecommendations.length == 0 ? (
        <p className="text-xl text-center my-16 mx-auto p-4">
          Woah! You're following everyone on the platform! 😎
        </p>
      ) : (
        followRecommendations.map((user) => (
          <FollowProfile key={user.username} user={user} api_url={api_url} />
        ))
      )}
    </div>
  );
};

export default FollowRecommendations;
