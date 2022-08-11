import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import InputField from "../FormFields/InputField";

const MemeUploadFinalStep = () => {
  const inputBackground = useColorModeValue("#fff", "gray.500");
  return (
    <>
      <InputField
        inputBackground={inputBackground}
        formLabel="Title*"
        name="title"
        rules={{
          required: "Please add title",
        }}
      />
      <InputField
        inputBackground={inputBackground}
        formLabel="Desciption (Optional)"
        name="desciption"
      />
    </>
  );
};

export default MemeUploadFinalStep;
