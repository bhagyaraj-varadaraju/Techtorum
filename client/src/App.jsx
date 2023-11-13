import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import ViewPost from "./pages/ViewPost.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import { Flex } from "@chakra-ui/react";
import Login from "./pages/Login.jsx";
import { UserContext, UserProvider } from "./context/UserContext.jsx";
import { useContext } from "react";
import Logout from "./pages/Logout.jsx";

function App() {
  const ctx = useContext(UserContext);
  const { user } = ctx;

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: user && user.id ? <HomeFeed /> : <Login />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/:userName",
          element: user && user.id ? <ViewProfile /> : <Login />,
        },
        {
          path: "/new-post",
          element: user && user.id ? <CreatePost /> : <Login />,
        },
        {
          path: "/:userName/post/:id",
          element: user && user.id ? <ViewPost /> : <Login />,
        },
        {
          path: "/:userName/post/:id/edit",
          element: user && user.id ? <EditPost /> : <Login />,
        },
        {
          path: "/:userName/edit",
          element: user && user.id ? <EditProfile /> : <Login />,
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
