import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import GlobalNavigation from "../../components/Globals/Navbar/GlobalNavigation";

const PostComment = () => {
  const { postId = null } = useRouter()?.query;

  const fetchComments = useCallback(async () => {
    if (postId) {
      try {
        const response = await axios.get(`/comments/${postId}`);

        console.log(`response`, response);
      } catch (error) {}
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // TODO
  // Create two separate collections => comments, likes
  // store only count in meme API
  // store actual likes & comments in their own collections with meme_id

  return (
    <>
      <GlobalNavigation />
      WIP
    </>
  );
};

export default PostComment;
