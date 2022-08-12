import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

const PublicPostActions = () => {
  const likeCount = 0;
  const commentCount = 0;
  const borderColor = useColorModeValue("#000", "#fff");

  const displayBreakPoints = ["none", "none", "none", "inline", "inline"];

  return (
    <Flex gap={4} mt={4}>
      <Box
        border={"2px"}
        px={[3, 4]}
        py={2}
        borderColor="pink"
        borderRadius={"md"}
        cursor="pointer"
      >
        <Flex gap={2} alignItems="center">
          <AiOutlineHeart color="pink" size={22} />
          <Text fontSize={[14, 16]}>
            {likeCount} <Text display={displayBreakPoints}>Likes</Text>
          </Text>
        </Flex>
      </Box>
      <Box
        border={"2px"}
        px={[3, 4]}
        py={2}
        borderColor={borderColor}
        borderRadius={"md"}
        cursor="pointer"
      >
        <Flex gap={2} alignItems="center">
          <FaComments size={22} />
          <Text fontSize={[14, 16]}>
            {commentCount} <Text display={displayBreakPoints}>Comments</Text>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PublicPostActions;
