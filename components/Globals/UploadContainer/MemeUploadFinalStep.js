import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import InputField from "../FormFields/InputField";

const MemeUploadFinalStep = () => {
  const inputBackground = useColorModeValue("#fff", "gray.500");
  return (
    <>
      {/* <InputField
        inputBackground={inputBackground}
        formLabel="Title*"
        name="title"
        rules={{
          required: "Please add title",
        }}
      /> */}
      <InputField
        inputBackground={inputBackground}
        formLabel="Meme caption (Optional)"
        name="meme_caption"
        placeholder="Share your thoughts"
      />
      <Box h={4} />
      <InputField
        inputBackground={inputBackground}
        formLabel="Description (Optional)"
        name="description"
        placeholder="ONE DOES NOT SIMPLY FIND GOOD MEMES"
        fieldHelperText="Description will not be displayed, but is helpful for searching the meme."
      />
    </>
  );
};

export default MemeUploadFinalStep;
