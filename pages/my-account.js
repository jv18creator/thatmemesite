import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import GlobalNavigation from "../components/Globals/Navbar/GlobalNavigation";
import { UserContext } from "../contexts/user.context";
import useNavigateUserBack from "../hooks/auth/useNavigateUserBack";
import {
  DARK_BORDER_COLOR_PRIMARY,
  LIGHT_BORDER_COLOR_PRIMARY,
  LIGHT_CARD_BG,
} from "../styles/globalColorTheme";

const MyAccountPage = () => {
  const { isMounted } = useNavigateUserBack();
  const { user } = useContext(UserContext);
  const methods = useForm({
    defaultValues: user,
  });

  const shadow = useColorModeValue("lg", "2xl");
  const border = useColorModeValue(`0px`, `2px`);
  const borderColor = useColorModeValue(
    LIGHT_BORDER_COLOR_PRIMARY,
    DARK_BORDER_COLOR_PRIMARY
  );
  const cardBg = useColorModeValue(LIGHT_CARD_BG, "");

  // const resetFormValues = () => {};

  if (!isMounted) return;

  return (
    <>
      <GlobalNavigation />
      {/* border='1px' borderColor='gray.200' */}
      <Box
        borderBottom={border}
        borderRadius={8}
        borderBottomColor={borderColor}
        shadow={shadow}
        bg={cardBg}
        m={8}
      >
        <Flex p={4}>
          <Box position={"relative"}>
            <Avatar
              name={user?.photo_url ? user.photo_url : user.display_name}
              size={["lg", "xl"]}
              src={
                user?.photo_url
                  ? "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
                  : null
              }
            />
            <EditIcon
              h={[4, 6]}
              w={[4, 6]}
              cursor="pointer"
              position="absolute"
              top={"5%"}
              right="20%"
              transform={"translateX(100%)"}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default MyAccountPage;
