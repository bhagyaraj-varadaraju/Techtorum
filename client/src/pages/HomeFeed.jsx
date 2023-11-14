import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";

const HomeFeed = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : "";
  const profilePic = user ? user.avatarurl : "";

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchUserPosts = async () => {
      const res = await fetch("/api/posts/" + userName);
      const data = await res.json();
      setPosts(data);
    };

    fetchUserPosts();
  }, []);

  return (
    <div className="posts w-[100%]">
      {posts.length == 0 ? (
        <p className="text-4xl text-center my-16 mx-auto p-4">
          No posts yet 🙁
        </p>
        ) : (
        posts?.map((post, idx) => (
          <Link key={'link_' + idx} to={'/' + userName + '/post/' + post.id}>
            <PostCard
              key={post.id}
              authorName={userName}
              authorAvatar={profilePic}
              date={post.created_on.slice(0, 10)}
              title={post.title}
              content={post.content}/>
          </Link>
        ))
      )}
    </div>
  );
};

export default HomeFeed;
