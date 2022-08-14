import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MemePostsContext } from "../../../contexts/memePosts.context";
import MemePost from "./MemePost";
import { AnimatePresence, motion } from "framer-motion";

const PostOfMemes = () => {
  const { fetchMemes, isLoading, memes } = useContext(MemePostsContext);
  const bgColor = useColorModeValue("#EAF6F6", "");

  useEffect(() => {
    fetchMemes();
  }, []);

  if (isLoading) {
    return (
      <Stack m={4}>
        <Skeleton height="80px" />
        <Skeleton height="80px" />
        <Skeleton height="80px" />
      </Stack>
    );
  }

  return (
    <Box bg={bgColor} p={[6, 8]}>
      <Box maxWidth={"1080px"} mx="auto">
        <Flex justifyContent="space-between" direction={"row"}>
          {/* <Box> </Box> */}
          <Box width="100%">
            <AnimatePresence>
              {memes.map((meme) => {
                return (
                  <motion.div
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -3000, opacity: 0 }}
                    layoutId={meme.id}
                    key={meme._id}
                  >
                    <MemePost meme={meme} />
                    <amp-ad
                      width="100vw"
                      height="320"
                      type="adsense"
                      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                      data-ad-slot="9442765546"
                      data-auto-format="rspv"
                      data-full-width=""
                    >
                      <div overflow=""></div>
                    </amp-ad>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default PostOfMemes;
