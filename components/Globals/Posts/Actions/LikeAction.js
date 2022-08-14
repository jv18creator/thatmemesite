import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../../../contexts/user.context";
import { toggleLikeAction } from "../Utils/utils";

const LikeAction = ({ meme, setUpdatedMeme, setLikeAction, likeAction }) => {
  const { user } = useContext(UserContext);
  const navigate = useRouter();

  const handleLikeAction = async () => {
    if (!user) {
      navigate.push("/login");
      return;
    }
    const { action } = toggleLikeAction(meme, user);

    if (action === "like") {
      setLikeAction((prevState) => ({
        ...prevState,
        count: meme?.liked_by?.length ? meme?.liked_by?.length + 1 : 1,
        has_current_user_liked: true,
      }));
    } else {
      setLikeAction((prevState) => ({
        ...prevState,
        count: meme?.liked_by?.length ? meme?.liked_by?.length - 1 : 0,
        has_current_user_liked: false,
      }));
    }

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

    if (response?.data?.success) {
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
      {likeAction.has_current_user_liked ? (
        <Box cursor={"pointer"} onClick={handleLikeAction}>
          <AiFillHeart size={22} fill="#EC4856" />
        </Box>
      ) : (
        <Box cursor={"pointer"} onClick={handleLikeAction}>
          <AiOutlineHeart size={22} />
        </Box>
      )}
    </>
  );
};

export default LikeAction;
