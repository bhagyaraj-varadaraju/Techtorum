import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const API_URL = process.env.NODE_ENV === "production"
  ? "https://techtorum-server.up.railway.app"
  : "http://localhost:3001";

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    };

    getUser();
  }, []);

  const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      credentials: "include",
    });
    const json = await response.json();
    window.location.href = `/`;
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
