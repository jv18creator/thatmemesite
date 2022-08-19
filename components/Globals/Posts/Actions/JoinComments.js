import React, { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/user.context";
import CommentField from "../../FormFields/CommentField";
import { FormProvider, useForm } from "react-hook-form";
import {
  Flex,
  Button,
  useToast,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import API from "../../../../helpers/axios/API";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import Link from "next/link";

const JoinComments = ({ meme_id, setUpdatedMeme }) => {
  const { user } = useContext(UserContext);
  const bgColorLogInBtn = useColorModeValue("#fff", "#000");
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    comment: "",
  });
  const toast = useToast();
  const navigate = useRouter();

  const onSubmit = async (data) => {
    if (isEmpty(user)) {
      navigate.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.put(`/add-comment`, {
        commented_by: {
          comment: data.comment,
          user: {
            auth_id: user?.auth_id,
            display_name: user?.display_name,
            photo_url: user?.photo_url,
            email: user?.profile?.data?.email,
          },
        },
        meme_id: meme_id,
      });

      if (response.data.success) {
        toast({
          title: undefined,
          description: "Comment added.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        methods.reset({
          comment: "",
        });
        setUpdatedMeme(response.data.meme);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!user ? (
        <Flex
          bgGradient="linear(to-r, red.500, yellow.500)"
          gap={2}
          p={4}
          borderRadius="lg"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text flex={1} fontWeight={600} color="#fff">
            Join the comment section
          </Text>
          <Link href="/login">
            <Button fontSize={16} fontWeight={600} bg={bgColorLogInBtn}>
              Log In
            </Button>
          </Link>
        </Flex>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Flex gap={2} alignItems="center">
              <CommentField
                name="comment"
                size="sm"
                disabled={isLoading}
                autoFocus={false}
                placeholder={"Add a comment"}
                rules={{
                  required: true,
                }}
              />
              <Button
                // bg="transparent"
                fontSize={14}
                fontWeight="400"
                size="sm"
                type="submit"
                isLoading={isLoading}
              >
                Post
              </Button>
            </Flex>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default JoinComments;
