import { Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import { UserContext } from "../../../contexts/user.context";
import LikeAction from "./Actions/LikeAction";
import PostActionDetails from "./PostActionDetails";
import CommentAction from "./Actions/CommentAction";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const PublicPostActions = ({ meme, setUpdatedMeme }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const navigate = useRouter();
  const { user } = useContext(UserContext);
  const [likeAction, setLikeAction] = useState({
    count: meme?.liked_by?.length ? meme?.liked_by?.length : 0,
    has_current_user_liked: meme?.liked_by?.length
      ? meme?.liked_by?.some((liked_by) => liked_by.auth_id === user?.auth_id)
      : false,
  });

  return (
    <>
      <Flex gap={4} mt={4}>
        <LikeAction
          meme={meme}
          likeAction={likeAction}
          setUpdatedMeme={setUpdatedMeme}
          setLikeAction={setLikeAction}
        />
        <FaRegComment
          onClick={() => {
            if (!user) {
              navigate.push("/login");
              return;
            }
            setShowCommentInput((prevState) => !prevState);
          }}
          size={20}
          style={{ cursor: "pointer" }}
        />
        <BiShare size={22} style={{ transform: `rotateY(180deg)` }} />
      </Flex>

      <Flex gap={6} mt={2}>
        <PostActionDetails likeAction={likeAction} meme={meme} />
      </Flex>

      <AnimatePresence>
        {showCommentInput && (
          <CommentAction meme={meme} setUpdatedMeme={setUpdatedMeme} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicPostActions;
