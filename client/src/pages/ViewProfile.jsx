import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
  const [profilePic, setProfilePic] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [bio, setBio] = useState("Put your bio here!");
  const { userName } = useParams();

  return (
    <div>
      <div className="header">
        <div className="profile-pic">
          <img src={profilePic}></img>
        </div>
        <div className="user-details">
          <h2>{userName}</h2>
          <p>{bio}</p>
        </div>
        <div className="followers">
          <p>Followers</p>
          <p>0</p>
        </div>
        <div className="following">
          <p>Following</p>
          <p>0</p>
        </div>
        <div>
          <button>Edit Profile</button>
        </div>
      </div>
      <div className="posts"></div>
    </div>
  );
};

export default ViewProfile;
