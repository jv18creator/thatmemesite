import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { MemePostsContext } from "../../../contexts/memePosts.context";
import PublicPostActions from "./PublicPostActions";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const bg = useColorModeValue("#fff", "#000");
  return (
    <ChevronRightIcon
      onClick={onClick}
      bg={bg}
      borderRadius="full"
      shadow="2xl"
      h={5}
      w={5}
      cursor="pointer"
      style={{
        position: "absolute",
        top: "50%",
        right: "-2%",
        transform: `translateY(-50%)`,
      }}
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  const bg = useColorModeValue("#fff", "#000");

  return (
    <ChevronLeftIcon
      onClick={onClick}
      bg={bg}
      borderRadius="full"
      shadow="2xl"
      h={5}
      w={5}
      cursor="pointer"
      style={{
        position: "absolute",
        top: "50%",
        left: "-1%",
        transform: `translateY(-50%)`,
        zIndex: "1000",
      }}
    />
  );
}

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const PostOfMemes = () => {
  const { fetchMemes, isLoading, memes } = useContext(MemePostsContext);

  const boxShadow = useColorModeValue("lg", "2xl");

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
    <Box m={[6, 8]}>
      <Box maxWidth={"1605px"} mx="auto">
        {memes.map((meme) => {
          return (
            <Flex
              direction={"column"}
              boxShadow={boxShadow}
              width={["100%", "60%", "30%"]}
              px={[4, 6]}
              py={[6]}
              borderRadius="md"
              key={meme._id}
            >
              <Box>
                <Flex gap={2} alignItems="center" justifyContent="flex-start">
                  <Box>
                    <Avatar
                      size="sm"
                      name={
                        meme.user?.photo_url
                          ? meme.user?.photo_url
                          : meme.user?.display_name
                      }
                    />
                  </Box>
                  <Box>
                    <Heading fontSize={18}>{meme.user?.display_name}</Heading>
                  </Box>
                </Flex>
              </Box>

              <Box h={2} />
              {meme?.description ? (
                <Box>
                  <Text fontSize={14} mb={2}>
                    {meme?.description}
                  </Text>
                </Box>
              ) : null}
              <Box>
                <Slider {...settings}>
                  {meme.images.map(({ url, alt }, index) => {
                    return (
                      <AspectRatio
                        key={index.toString()}
                        //   width="64px"
                        //   maxWidth="240px"
                        //   maxHeight="120px"
                        ratio={4 / 5}
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
              <Box mt={meme.images?.length > 1 ? 8 : 2}>
                <Divider />
              </Box>
              <PublicPostActions />
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default PostOfMemes;
