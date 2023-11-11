import { Image, Flex, Spacer, Heading, Input, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavHeader = () => {
  const { user } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  const handleLogout = async () => {
    logout();
  };

  return (
    <Flex
      w="full"
      alignItems="center"
      bg="gray.700"
      color="#F7FAFC"
      px={["2", "4", "8"]}
      py={["2", "4", "4"]}
    >
      <NavLink to="/">
        <Flex gap={["1", "1", "2"]} alignItems="center">
          <Image
            htmlHeight="28px"
            htmlWidth="28px"
            src="/chat-balloons.png"
            alt="Logo"
          />
          <Heading
            display={["none", "block", "block"]}
            fontSize={["md", "2xl", "3xl"]}
          >
            TechTorum
          </Heading>
        </Flex>
      </NavLink>

      <Spacer />
      <Flex alignItems="center">
        <Input
          size={["sm", "md", "md"]}
          type="text"
          variant="filled"
          color="black"
          _focus={{ bg: "gray.100" }}
          focusBorderColor="gray.500"
          borderRadius="24"
          placeholder="Search Title"
        />
      </Flex>
      <Spacer />

      <Flex gap={["2", "4", "8"]} alignItems="center">
        <NavLink
          to="/new-post"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "",
          })}
        >
          <Flex gap={["1", "1", "2"]} alignItems="center">
            <FontAwesomeIcon icon={faPenToSquare} />
            <Text fontSize={["xs", "sm", "lg"]}>Write</Text>
          </Flex>
        </NavLink>
        <NavLink
          to={`/${user ? user.username : ""}`}
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "",
          })}
        >
          <Image
            className="rounded-full object-cover"
            htmlHeight="32px"
            htmlWidth="32px"
            src={
              user
                ? user.avatarurl
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="Logo"
          />
        </NavLink>
        {user && (
          <button className="font-bold" onClick={handleLogout}>
            Logout
          </button>
        )}
      </Flex>
    </Flex>
  );
};

export default NavHeader;
