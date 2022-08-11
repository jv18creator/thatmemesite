import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ImageUploadField from "../FormFields/ImageUploadField";
import ReadableImages from "./ReadableImages";
import { motion } from "framer-motion";

const MemeUploadIntStep = ({ readableImages, handleImageDeletion }) => {
  return (
    <>
      {!readableImages?.length ? (
        <Container
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          my={[2, 4]}
        >
          <AspectRatio width="48" ratio={1}>
            <Box
              borderColor="gray.300"
              borderStyle="dashed"
              borderWidth="2px"
              rounded="md"
              shadow="sm"
              role="group"
              transition="all 150ms ease-in-out"
              _hover={{
                shadow: "md",
              }}
              as={motion.div}
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              <Box position="relative" height={"100%"} width="100%">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Stack
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justify="center"
                    spacing="4"
                  >
                    <Stack textAlign="center" spacing="1">
                      <Heading fontSize="lg" fontWeight="bold">
                        Drop images here
                      </Heading>
                      <Text fontWeight="light">or click to upload</Text>
                    </Stack>
                  </Stack>
                </Box>
                <ImageUploadField
                  rules={{
                    validate: (value) => {
                      if (value?.length < 1) {
                        return "Files is required";
                      }
                    },
                  }}
                  multiple
                  name={"meme_images"}
                />
              </Box>
            </Box>
          </AspectRatio>
        </Container>
      ) : null}
      <Flex
        sx={{
          "&::-webkit-scrollbar": {
            height: "8px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.3)`,
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            height: "8px",
            backgroundColor: `teal`,
          },
        }}
        gap={4}
        overflowX="auto"
        pt={4}
        pb={2}
        // justifyContent={"center"}
        // alignItems="flex-end"
        // ml={10}
      >
        {readableImages.map((image, index) => {
          return (
            <ReadableImages
              key={index.toString()}
              image={image}
              imageUrl={image.imageUrl}
              handleImageDeletion={handleImageDeletion}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default MemeUploadIntStep;
