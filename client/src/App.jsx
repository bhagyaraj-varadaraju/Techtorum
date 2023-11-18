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
import { UserContext } from "./context/UserContext.jsx";
import { useContext } from "react";
import { SearchProvider } from "./context/SearchContext.jsx";
import Logout from "./pages/Logout.jsx";

function App() {
  const ctx = useContext(UserContext);
  const { user } = ctx;
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://techtorum-server.up.railway.app"
      : "http://localhost:3001";

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: user && user.id ? <HomeFeed api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
        {
          path: "/login",
          element: <Login api_url={API_URL} />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
        {
          path: "/:userName",
          element:
            user && user.id ? <ViewProfile api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
        {
          path: "/:userName/new-post",
          element:
            user && user.id ? <CreatePost api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
        {
          path: "/:userName/post/:id",
          element: user && user.id ? <ViewPost api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
        {
          path: "/:userName/post/:id/edit",
          element: user && user.id ? <EditPost api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
        {
          path: "/:userName/edit",
          element:
            user && user.id ? <EditProfile api_url={API_URL} /> : <Login api_url={API_URL} />,
        },
      ],
    },
  ]);

  return (
    <Flex className="App" bg="gray.400">
      <SearchProvider>
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </Flex>
  );
}

export default App;
