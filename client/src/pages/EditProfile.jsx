import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const userName = useParams().userName;
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: bio.current.value,
        avatarurl: avatarurl.current.value,
      }),
    };
    await fetch("/api/users/" + userName, options);

    navigate("/" + userName);
  };

  const bio = useRef(null);
  const avatarurl = useRef(null);

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Update Profile</h1>
      <div>Bio</div>
      <input type="text" ref={bio} placeholder="Update your Bio..." />
      <div>Profile Pic</div>
      <input type="text" ref={avatarurl} placeholder="Paste your image link" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditProfile;
