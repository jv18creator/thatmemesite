import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { isEmpty } from "lodash";
import Link from "next/link";

const GlobalNavigation = () => {
  const { user, logOutUser } = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const borderColor = useColorModeValue("#EDF2F7", "#2D3748");
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
            <Box onClick={toggleColorMode} cursor="pointer">
              {colorMode === "light" ? (
                <MoonIcon w={[4, 6]} h={[4, 6]} />
              ) : (
                <SunIcon w={[4, 6]} h={[4, 6]} />
              )}
            </Box>
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
                  <Avatar size={["sm", "md"]} name={user.display_name} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link href="/my-account">My Account</Link>
                  </MenuItem>
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
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default GlobalNavigation;
