import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Logout = () => {
  const { logout } = useContext(UserContext);
  logout();
  window.location.href = `/`;
};

export default Logout;
