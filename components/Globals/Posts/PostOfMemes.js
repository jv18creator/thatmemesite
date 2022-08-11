import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PostOfMemes = () => {
  const [state, setState] = useState({
    isLoading: true,
    memes: [],
  });

  const fetchMemes = async () => {
    try {
      const response = await axios.get("/api/memes");
      console.log(`response`, response);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        memes: response.data.memes,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  if (state.isLoading) {
    return (
      <Stack m={4}>
        <Skeleton height="80px" />
        <Skeleton height="80px" />
        <Skeleton height="80px" />
      </Stack>
    );
  }

  return (
    <Box m={4}>
      {state.memes.map((meme) => {
        return (
          <Flex direction={"column"} gap={8} key={meme.id}>
            {meme.images.map((image, index) => {
              return (
                <AspectRatio
                  key={index.toString()}
                  //   width="64px"
                  //   maxWidth="240px"
                  //   maxHeight="120px"
                  ratio={4 / 5}
                  width={["100%", "50%", "20%"]}
                >
                  <Image
                    src={image}
                    alt=""
                    objectFit="cover"
                    objectPosition={"center"}
                  />
                </AspectRatio>
              );
            })}
          </Flex>
        );
      })}
    </Box>
  );
};

export default PostOfMemes;
