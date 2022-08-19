import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import GlobalNavigation from "../../../components/Globals/Navbar/GlobalNavigation";
import Slider from "react-slick";
import { useToast } from "@chakra-ui/react";
import API from "../../../helpers/axios/API";
import {
  AspectRatio,
  Skeleton,
  Stack,
  Flex,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { settings } from "../../../components/Globals/Posts/Utils/utils";
import Head from "next/head";
import Image from "next/image";
import JoinComments from "../../../components/Globals/Posts/Actions/JoinComments";
import axios from "axios";

const CommentsPage = () => {
  const { postId = null } = useRouter()?.query;
  const navigate = useRouter();
  const toast = useToast();

  const [memeDetails, setMemeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (postId) {
      try {
        const response = await axios.get(`/api/memes?memeId=${postId}`);
        setMemeDetails(response.data.meme);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.status === 400) {
          toast({
            title: undefined,
            description: "Comments could not be found.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate.push("/404");
        }
      }
    }
  }, [postId, toast]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <GlobalNavigation />
      {isLoading ? (
        <Stack m={4}>
          <Skeleton height="80px" />
          <Skeleton height="80px" />
          <Skeleton height="80px" />
        </Stack>
      ) : (
        <Box py={8} px={4}>
          <Flex
            direction={"column"}
            // boxShadow={boxShadow}
            width={["100%", "85%", "65%", "55%", "45%"]}
            px={[4, 6]}
            py={6}
            borderRadius="md"
            // bg={boxBgColor}
            border="1px"
            borderColor={"light_primary"}
            mx="auto"
          >
            <Box>
              <Slider {...settings}>
                {memeDetails?.images?.map(({ url, alt }, index) => {
                  return (
                    <AspectRatio
                      key={index.toString()}
                      // ratio={4 / 5}
                      // width={["100%", "50%", "20%"]}
                    >
                      <Image
                        src={url}
                        alt={alt}
                        // objectFit="contain"
                        objectFit="cover"
                        objectPosition={"center"}
                        layout="fill"
                        priority={index === 0 ? true : false}
                      />
                    </AspectRatio>
                  );
                })}
              </Slider>
            </Box>
          </Flex>
          {memeDetails?.commented_by?.length ? (
            <Box maxW={["100%", "85%", "65%", "55%", "45%"]} mx="auto" mt={8}>
              {memeDetails?.commented_by?.map(({ comment, user }, index) => {
                return (
                  <React.Fragment key={index.toString()}>
                    <Box h={2} />
                    <Flex gap={2}>
                      <Avatar
                        size="xs"
                        name={user.display_name}
                        src={user?.photo_url}
                      />
                      <Box>
                        <Text fontSize={14}>{comment}</Text>
                      </Box>
                    </Flex>
                  </React.Fragment>
                );
              })}
            </Box>
          ) : null}
          <Box maxW={["100%", "85%", "65%", "55%", "45%"]} mx="auto" mt={8}>
            <JoinComments meme_id={memeDetails._id} />
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default CommentsPage;
