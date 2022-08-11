import { Input, Text } from "@chakra-ui/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { validateFiles } from "../../../helpers/validateFiles";

const ImageUploadField = ({ name, multiple }) => {
  const { control, setValue } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          // required: "Please add"
          validate: validateFiles,
        }}
        render={() => {
          return (
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              //   value={field.value}
              multiple={multiple}
              onChange={(event) => {
                setValue(name, event.target.files);
              }}
            />
          );
        }}
      />
    </>
  );
};

export default ImageUploadField;
