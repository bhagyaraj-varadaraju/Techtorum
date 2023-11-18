import React, { useState } from "react";
import { Card, VStack, Heading, Button, useToast } from "@chakra-ui/react";
import PostInputForm from "../components/PostInputForm";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  // For handling the form inputs
  const [post, setPost] = useState({ title: "", content: "" });
  const toast = useToast();
  const navigate = useNavigate();
  const userName = useParams().userName;

  const createPost = async (event) => {
    event.preventDefault();

    console.log(post);
    //CREATE the Post
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    await fetch("/api/posts/" + userName, options);

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
        <Heading fontSize={["md", "lg", "lg"]}>Create your post</Heading>

        <PostInputForm post={post} setPost={setPost} />

        <Button variant="solid" colorScheme="gray" onClick={createPost}>
          Publish
        </Button>
      </VStack>
    </Card>
  )
}

export default CreatePost;
