import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Button,
  VStack,
  Heading,
  useToast,
  HStack,
} from "@chakra-ui/react";
import PostInputForm from "../components/PostInputForm";

const EditPost = ({ api_url }) => {
  const [post, setPost] = useState({ title: "", content: "" });
  const { userName, id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const readPost = async () => {
      // GET the selected Post
      const res = await fetch(`${api_url}/api/posts/` + userName + "/" + id);
      const data = await res.json();
      // Set the retrieved post data to the state variable
      if (data && data.length !== 0) {
        setPost((post) => ({ ...post, ...data[0] }));
      } else {
        alert("Post not found");
      }
    };

    readPost();
  }, []);

  const editPost = async (event) => {
    event.preventDefault();

    //Edit the Post
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    await fetch(`${api_url}/api/posts/` + userName + "/" + id, options);

    setPost({ title: "", content: "" });

    navigate("/");
  };

  const deletePost = async (event) => {
    event.preventDefault();

    //Delete the Post
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(post),
    };
    await fetch(`${api_url}/api/posts/` + userName + "/" + id, options);

    setPost({ title: "", content: "" });

    navigate("/");
  };

  return (
    <Card
      w={["xs", "md", "lg"]}
      p={["4", "8", "8"]}
      bg="gray.50"
      direction="column"
      align="center"
    >
      <VStack spacing={["4", "8", "8"]}>
        <Heading fontSize={["md", "lg", "lg"]}>Edit your post</Heading>

        <PostInputForm post={post} setPost={setPost} />

        <HStack>
          <Button variant="solid" colorScheme="gray" onClick={editPost}>
            Publish with Changes
          </Button>
          <Button variant="solid" colorScheme="gray" onClick={deletePost}>
            Delete
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
};

export default EditPost;
