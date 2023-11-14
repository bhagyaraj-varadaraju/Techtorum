import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Text, Heading, VStack, useToast } from "@chakra-ui/react";
import TimeAgo from 'react-timeago'

const ViewPost = () => {
  const [post, setPost] = useState({ title: "", content: "", upvoteCount: 0, downCount: 0, created_on: "" });
  const { userName, id } = useParams();

  useEffect(() => {
    const readPost = async () => {
        // GET the selected Post
        const res = await fetch("/api/posts/" + userName + "/" + id);
        const data = await res.json();

        console.log(data);

        // Set the retrieved post data to the state variable
        if (data && data.length != 0) {
            setPost(data[0]);
        }
    }

    readPost().catch(console.error);
  }, [])

  return (
    <Card w={['xs', 'md', 'lg']} p={['4', '8', '8']} bg='gray.50' direction='column'>
      <VStack spacing={['2', '4', '4']} align='left' textAlign='left'>
          {/* <Text fontSize={['xs', 'sm', 'sm']}>Posted <TimeAgo date={post.created_on} /></Text> */}

          <Heading fontSize={['md', 'lg', 'lg']}>{post.title}</Heading>

          <Text fontSize={['md', 'lg', 'lg']}>{post.content}</Text>
      </VStack>
    </Card>
)
};

export default ViewPost;
