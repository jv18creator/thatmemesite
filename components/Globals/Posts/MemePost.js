import React, { useState } from "react";
import {
  AspectRatio,
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import PublicPostActions from "./PublicPostActions";
import Slider from "react-slick";
import { settings } from "./Utils/utils";
import Image from "next/image";

const MemePost = ({ meme }) => {
  const [updatedMeme, setUpdatedMeme] = useState(meme);

  return (
    <Flex
      direction={"column"}
      boxShadow={boxShadow}
      width={["100%", "60%", "30%"]}
      px={[4, 6]}
      py={6}
      borderRadius="md"
      key={updatedMeme._id}
      bg={boxBgColor}
      border="1px"
      borderColor={"light_primary"}
      mb={8}
    >
      <Box>
        <Flex gap={2} alignItems="center" justifyContent="flex-start">
          <Box>
            <Avatar
              size="sm"
              name={
                updatedMeme.user?.photo_url
                  ? updatedMeme.user?.photo_url
                  : updatedMeme.user?.display_name
              }
            />
          </Box>
          <Box>
            <Heading fontSize={18}>{updatedMeme.user?.display_name}</Heading>
          </Box>
        </Flex>
      </Box>

      <Box h={2} />
      {updatedMeme?.description ? (
        <Box>
          <Text fontSize={14} mb={2}>
            {updatedMeme?.description}
          </Text>
        </Box>
      ) : null}
      <Box>
        <Slider {...settings}>
          {updatedMeme.images.map(({ url, alt }, index) => {
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
      <Box mt={updatedMeme.images?.length > 1 ? 8 : 2}>
        <Divider />
      </Box>
      <PublicPostActions meme={updatedMeme} setUpdatedMeme={setUpdatedMeme} />
    </Flex>
  );
};

export default MemePost;
