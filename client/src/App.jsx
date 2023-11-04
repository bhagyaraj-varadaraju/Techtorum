import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import ViewPost from "./pages/ViewPost.jsx";
import ViewProfile from "./pages/ViewProfile.jsx";
import EditProfile from "./pages/EditProfile.jsx";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomeFeed />,
    },
    {
      path: "/post/new",
      element: <CreatePost />,
    },
    {
      path: "/post/:id/edit",
      element: <EditPost />,
    },
    {
      path: "/post/:id",
      element: <ViewPost />,
    },
    {
      path: "/:username",
      element: <ViewProfile />,
    },
    {
      path: "/:username/edit",
      element: <EditProfile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
