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
    <form className="flex flex-col" onSubmit={handleFormSubmit}>
      <h1 className="text-3xl text-center font-bold">Update Profile</h1>
      <div className="font-bold text-xl my-2">Bio</div>
      <textarea
        ref={bio}
        placeholder="Update your Bio..."
        className="placeholder:p-2 resize-none rounded-sm mt-2 bg-gray-200"
        rows="3"
        cols="50"
      ></textarea>
      <div className="font-bold text-xl my-2">Profile Pic</div>
      <input
        type="text"
        ref={avatarurl}
        placeholder="Paste your image link"
        className="placeholder:p-2 w-full rounded-sm mt-2 bg-gray-200"
      />
      <button
        type="submit"
        className="py-2 px-4 mx-auto self-center my-8 bg-gray-800 font-bold text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default EditProfile;
