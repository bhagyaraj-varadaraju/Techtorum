import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
// import TimeAgo from "react-timeago";
import { Button, HStack, Spacer } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

const ViewPost = () => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    username: "",
    avatarurl: "",
    created_on: "",
    upvotes: 0,
    downvotes: 0,
  });
  const { userName, id } = useParams();

  const getVotes = async () => {
    const res = await fetch("/api/votes/" + id);
    const data = await res.json();

    const { upvotes, downvotes } = data;
    setPost((post) => ({ ...post, upvotes, downvotes }));
  };

  useEffect(() => {
    const readPost = async () => {
      // GET the selected Post
      const res = await fetch("/api/posts/" + userName + "/" + id);
      const data = await res.json();
      // Set the retrieved post data to the state variable
      if (data && data.length !== 0) {
        setPost((post) => ({ ...post, ...data[0] }));
      } else {
        alert("Post not found");
      }
    };

    readPost();
    getVotes();
  }, []);

  const handleVote = async (voteType) => {
    const res = await fetch(`/api/votes/${voteType}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    const data = await res.json();
    getVotes();
  };

  return (
    <div className="w-[80vw] m-4 p-4">
      <HStack>
        <h1 className="text-4xl font-bold my-4">{post.title}</h1>
        <Spacer />
        {
          userName == post.username &&
          <NavLink to={"/" + userName + "/post/" + post.id + "/edit"}>
            <Button variant="solid" colorScheme="gray">Edit Post</Button>
          </NavLink>
        }
      </HStack>
      <div className="flex items-center justify-center gap-1">
        <Link className="flex" to={`/${post.username}`}>
          <img
            src={post.avatarurl}
            alt="Author Avatar"
            className="w-12 h-12 rounded-full"
          />
          <p className="m-2 text-xl font-semibold">{post.username}</p>
        </Link>
        <button className="flex gap-1" onClick={() => handleVote("upvote")}>
          <FontAwesomeIcon className="text-xl mt-1" icon={faThumbsUp} />
          <p className="text-xl">{post.upvotes}</p>
        </button>
        <button
          className="flex gap-1 align-middle justify-center"
          onClick={() => handleVote("downvote")}>
          <FontAwesomeIcon className="text-xl mt-1" icon={faThumbsDown} />
          <p className="text-xl">{post.downvotes}</p>
        </button>
        <div className="ml-auto">
          <p className="text-xl">{post.created_on.slice(0, 10)}</p>
        </div>
      </div>
      <p className="mt-4 text-justify">{post.content}</p>
    </div>
  )
}

export default ViewPost;
