import { VStack, Input, Textarea } from "@chakra-ui/react";

function PostInputForm({ post, setPost }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <VStack w={["xs", "md", "lg"]} spacing={["4", "8", "8"]} p="4">
      <Input
        type="text"
        variant="filled"
        _focus={{ bg: "gray.100" }}
        focusBorderColor="gray.500"
        id="title"
        name="title"
        value={post.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <Textarea
        type="text"
        variant="filled"
        _focus={{ bg: "gray.100" }}
        focusBorderColor="gray.500"
        rows="8"
        id="content"
        name="content"
        value={post.content}
        onChange={handleChange}
        placeholder="Content"
      />

      {/* <Input type='text' variant='filled' _focus={{ bg: 'gray.100' }} focusBorderColor="gray.500" id="image" name="image" value={post.image} onChange={handleChange} placeholder='Image URL (Optional)'/> */}
    </VStack>
  );
}

export default PostInputForm;
