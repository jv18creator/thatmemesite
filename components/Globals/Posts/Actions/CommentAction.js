import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Flex, useToast } from "@chakra-ui/react";
import CommentField from "../../FormFields/CommentField";
import { UserContext } from "../../../../contexts/user.context";
import { useRouter } from "next/router";
import axios from "axios";

const CommentAction = ({ meme, setUpdatedMeme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const methods = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const { user } = useContext(UserContext);
  const navigate = useRouter();

  const onSubmit = async (data) => {
    if (!user) {
      navigate.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(`/api/add-comment`, {
        commented_by: {
          comment: data.comment,
          user: {
            auth_id: user?.auth_id,
            display_name: user?.display_name,
            photo_url: user?.photo_url,
            email: user?.profile?.data?.email,
          },
        },
        meme_id: meme._id,
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
        // do stuff after comment is saved
      }

      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <motion.div
      style={{ marginTop: "12px" }}
      initial={{
        x: 40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -40,
        opacity: 0,
      }}
      transition={{ delay: 0, duration: 0.2 }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Flex gap={2} alignItems="center">
            <CommentField
              name="comment"
              size="sm"
              disabled={isLoading}
              autoFocus
              placeholder={"Add a comment"}
              rules={{
                required: true,
              }}
            />
            <Button
              bg="transparent"
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
    </motion.div>
  );
};

export default CommentAction;
