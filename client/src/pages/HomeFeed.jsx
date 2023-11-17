import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { UserContext } from "../context/UserContext";
import FollowRecommendations from "../components/FollowRecommendations";

const HomeFeed = () => {
  const { user } = useContext(UserContext);
  const userName = user ? user.username : "";
  const profilePic = user ? user.avatarurl : "";

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeedPosts = async () => {
      const res = await fetch("/api/feed/" + userName);
      const data = await res.json();
      setPosts(data);
    };

    fetchFeedPosts();
  }, []);

  return (
    <div className="homefeed flex">
      <div className="posts w-3/4">
        {posts.length == 0 ? (
          <p className="text-4xl text-center my-16 mx-auto p-4">
            No posts yet 🙁
          </p>
        ) : (
          posts?.map((post, idx) => (
            <Link key={"link_" + idx} to={"/" + userName + "/post/" + post.id}>
              <PostCard
                key={post.id}
                authorName={post.username}
                authorAvatar={post.avatarurl}
                date={post.created_on.slice(0, 10)}
                title={post.title}
                content={post.content}
              />
            </Link>
          ))
        )}
      </div>
      <div className="follow-recommendations w-1/4">
        <FollowRecommendations />
      </div>
    </div>
  );
};

export default HomeFeed;
