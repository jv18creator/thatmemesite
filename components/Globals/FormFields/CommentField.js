import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { ERROR_TEXT_CLR } from "../../../styles/globalColorTheme";

const CommentField = (props) => {
  const {
    name,
    placeholder,
    type,
    rules = {},
    inputBackground = undefined,
    formLabel = null,
    fieldHelperText = null,
    size = "md",
    autoFocus = false,
    disabled = false,
  } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {formLabel ? <FormLabel>{formLabel}</FormLabel> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              autoFocus={autoFocus}
              placeholder={placeholder}
              disabled={disabled}
              variant="filled"
              value={field.value}
              borderBottom="2px"
              borderRadius={"2px"}
              className="comment_focus"
              borderBottomColor={"#66BFBF"}
              focusBorderColor="none"
              size={size}
              onChange={field.onChange}
              type={type}
              background={inputBackground}
              shadow="sm"
              fontSize={14}
              isInvalid={errors?.[name]?.message ? true : false}
            />
            {errors?.[name]?.message ? (
              <Text fontSize={"xs"} color={ERROR_TEXT_CLR}>
                {errors[name].message}
              </Text>
            ) : null}
          </>
        )}
      />
      {fieldHelperText ? (
        <>
          <Box mb={2} />
          <FormLabel fontSize={12}>{fieldHelperText}</FormLabel>
        </>
      ) : (
        <Box mb={2} />
      )}
    </>
  );
};

CommentField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default CommentField;
