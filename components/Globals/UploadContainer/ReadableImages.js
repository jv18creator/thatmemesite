import React from "react";
import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { MdRemoveCircle } from "react-icons/md";

const ReadableImages = (props) => {
  return (
    <Box position={"relative"}>
      <AspectRatio width="64px" maxWidth="240px" ratio={4 / 5} minWidth="120px">
        <Image
          src={props.imageUrl}
          fallbackSrc="https://via.placeholder.com/150"
          alt="gibbresh"
          objectFit="cover"
          objectPosition={"center"}
        />
      </AspectRatio>
      <Box
        onClick={() => props.handleImageDeletion(props.image)}
        position={"absolute"}
        cursor="pointer"
        right="-5%"
        top="-5%"
      >
        <MdRemoveCircle fill="#F88379" size={20} />
      </Box>
    </Box>
  );
};

export default ReadableImages;
