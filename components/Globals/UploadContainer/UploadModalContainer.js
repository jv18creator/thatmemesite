import { Flex, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { BsUpload } from "react-icons/bs";
import {
  DARK_BORDER_COLOR_PRIMARY,
  LIGHT_BORDER_COLOR_PRIMARY,
} from "../../../styles/globalColorTheme";
import _ from "lodash";
import UploadModal from "./UploadModal";

const UploadModalContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const borderColor = useColorModeValue(
    LIGHT_BORDER_COLOR_PRIMARY,
    DARK_BORDER_COLOR_PRIMARY
  );

  return (
    <>
      <Flex
        alignItems={"center"}
        gap={2}
        _hover={{
          cursor: "pointer",
          borderBottomColor: borderColor,
          borderBottom: "2px",
        }}
        onClick={onOpen}
      >
        <BsUpload style={{ cursor: "pointer" }} size={18} />
        <Text fontSize={[12, 14]}>UPLOAD A MEME</Text>
      </Flex>

      {isOpen && <UploadModal isOpen={isOpen} onClose={onClose} onOp />}
    </>
  );
};

export default UploadModalContainer;
