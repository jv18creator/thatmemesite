import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { isEmpty } from "lodash";
import Link from "next/link";
import {
  DARK_BORDER_COLOR_PRIMARY,
  LIGHT_BORDER_COLOR_PRIMARY,
} from "../../../styles/globalColorTheme";
import { AiOutlineHome } from "react-icons/ai";

const GlobalNavigation = () => {
  const { user, logOutUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const borderColor = useColorModeValue(
    LIGHT_BORDER_COLOR_PRIMARY,
    DARK_BORDER_COLOR_PRIMARY
  );
  const shadow = useColorModeValue("sm", "lg");

  return (
    <Box
      borderBottom={"2px"}
      borderBottomColor={borderColor}
      shadow={shadow}
      p={4}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem command="⌘T">New Tab</MenuItem>
            <MenuItem command="⌘N">New Window</MenuItem>
            <MenuItem command="⌘⇧N">Open Closed Tab</MenuItem>
            <MenuItem command="⌘O">Open File...</MenuItem>
          </MenuList>
        </Menu>
        <Box>
          <Flex gap={4} alignItems="center">
            <Box display={["none", "block"]}>
              <Link href="/">
                <Flex
                  alignItems={"center"}
                  gap={2}
                  transition="all 100ms"
                  transitionDuration={3000}
                  transitionTimingFunction="ease-in-out"
                  _hover={{
                    cursor: "pointer",
                    borderBottomColor: borderColor,
                    borderBottom: "2px",
                  }}
                >
                  <AiOutlineHome style={{ cursor: "pointer" }} size={26} />
                  <Text style={{ display: "flex" }}>HOME</Text>
                </Flex>
              </Link>
            </Box>
            <Center display={["none", "block"]} height="50px">
              <Divider orientation="vertical" />
            </Center>
            {!isEmpty(user) ? (
              <Menu>
                <MenuButton
                  transition="all 0.2s"
                  borderRadius="full"
                  borderWidth="4px"
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
                >
                  <Avatar size="sm" name={user.display_name} />
                </MenuButton>
                <MenuList>
                  <Link href="/my-account">
                    <MenuItem>My Account</MenuItem>
                  </Link>
                  <MenuItem
                    bg={"#FC8181"}
                    onClick={async () => await logOutUser()}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            )}
            <Box onClick={toggleColorMode} cursor="pointer">
              {colorMode === "light" ? (
                <MoonIcon w={[5, 6]} h={[5, 6]} />
              ) : (
                <SunIcon w={[5, 6]} h={[5, 6]} />
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default GlobalNavigation;
