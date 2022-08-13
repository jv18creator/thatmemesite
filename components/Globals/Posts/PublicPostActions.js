import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import axios from "axios";
import { UserContext } from "../../../contexts/user.context";
import { toggleLikeAction } from "./Utils/utils";

const PublicPostActions = ({ meme, setUpdatedMeme }) => {
  const { user } = useContext(UserContext);
  const [likeAction, setLikeAction] = useState({
    count: meme?.liked_by?.length ? meme?.liked_by?.length : 0,
    has_current_user_liked: meme?.liked_by?.length
      ? meme?.liked_by?.some((liked_by) => liked_by.auth_id === user?.auth_id)
      : false,
  });

  const commentCount = 0;

  const handleLikeAction = async () => {
    const { action } = toggleLikeAction(meme, user);
    const response = await axios.post("/api/update-meme-post", {
      liked_by: {
        auth_id: user?.auth_id,
        display_name: user?.display_name,
        photo_url: user?.photo_url,
        email: user?.profile?.data?.email,
      },
      liked: action === "like" ? true : false,
      meme_id: meme._id,
    });

    if (response.data.success) {
      setUpdatedMeme(response.data.meme);
      setLikeAction((prevState) => ({
        ...prevState,
        count: response.data.meme?.liked_by?.length,
        has_current_user_liked: response.data.meme?.liked_by?.length
          ? response.data.meme?.liked_by?.some(
              (liked_by) => liked_by.auth_id === user?.auth_id
            )
          : false,
      }));
    }
  };

  return (
    <>
      <Flex gap={4} mt={4}>
        {likeAction.has_current_user_liked ? (
          <Box cursor={"pointer"} onClick={handleLikeAction}>
            <AiFillHeart size={22} fill="#EC4856" />
          </Box>
        ) : (
          <AiOutlineHeart onClick={handleLikeAction} size={22} />
        )}
        <FaRegComment size={20} />
        <BiShare size={22} style={{ transform: `rotateY(180deg)` }} />
      </Flex>

      <Flex gap={6} mt={2}>
        <Box cursor={"pointer"}>
          <Text fontSize={14}>{likeAction.count} Likes</Text>
        </Box>
        <Box cursor={"pointer"}>
          <Text fontSize={14}>0 Comments</Text>
        </Box>
      </Flex>
    </>
  );
};

export default PublicPostActions;
