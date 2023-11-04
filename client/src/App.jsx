import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import ViewPost from "./pages/ViewPost.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import { Flex } from "@chakra-ui/react";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomeFeed />,
        },
        {
          path: "/new-post",
          element: <CreatePost />,
        },
        {
          path: "/post/:id",
          element: <ViewPost />,
        },
        {
          path: "/post/:id/edit",
          element: <EditPost />,
        },
        {
          //To be changed to /:username
          path: "/profile",
          element: <ViewProfile />,
        },
        {
          path: "/account/edit",
          element: <EditProfile />,
        },
      ],
    },
  ]);

  return (
    <Flex className="App" bg="gray.300">
      <RouterProvider router={appRouter} />
    </Flex>
  );
}

export default App;
