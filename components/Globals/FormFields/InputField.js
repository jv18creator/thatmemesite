import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { ERROR_TEXT_CLR } from "../../../styles/globalColorTheme";

const InputField = (props) => {
  const {
    name,
    placeholder,
    type,
    rules = {},
    inputBackground,
    formLabel,
  } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormLabel>{formLabel}</FormLabel>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              placeholder={placeholder}
              variant="filled"
              value={field.value}
              onChange={field.onChange}
              type={type}
              background={inputBackground}
              shadow="sm"
              isInvalid={errors?.[name]?.message ? true : false}
            />
            {errors?.[name]?.message ? (
              <Text fontSize={"xs"} color={ERROR_TEXT_CLR}>
                {errors[name].message}
              </Text>
            ) : null}
            <Box mb={3} />
          </>
        )}
      />
    </>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputField;
