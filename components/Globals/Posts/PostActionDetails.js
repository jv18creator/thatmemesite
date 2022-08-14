import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const PostActionDetails = ({ likeAction, meme }) => {
  return (
    <>
      <Box cursor={"pointer"}>
        <Text fontSize={14}>{likeAction.count} Likes</Text>
      </Box>
      <Link href={`/comments/${meme._id}`}>
        <Box cursor={"pointer"}>
          <Text fontSize={14}>
            {meme?.commented_by?.length ? meme?.commented_by?.length : 0}{" "}
            Comments
          </Text>
        </Box>
      </Link>
    </>
  );
};

export default PostActionDetails;
