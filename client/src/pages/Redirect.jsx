import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";

const Redirect = () => {
  const { username } = useParams();
  return <Navigate to={`/${username}`} />;
};

export default Redirect;
