import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as gtag from "../lib/gtag";

const SignUpPage = () => {
  const { handleSubmit, register } = useForm();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const inputBackground = useColorModeValue("#fff", "#000");

  const onUserSignUp = async (data) => {
    console.log(`data`, data);
    gtag.event({
      action: "user_creation_form",
      category: "Auth",
      label: "",
    });

    let response = await fetch("/api/signup", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.error(`err`, err));
  };

  return (
    <Flex height={"100vh"} alignItems="center" justifyContent={"center"}>
      <Flex
        shadow="lg"
        direction={"column"}
        background={formBackground}
        p={12}
        rounded={6}
      >
        <FormControl>
          <form onSubmit={handleSubmit(onUserSignUp)}>
            <Heading mb={6}>Sign Up</Heading>
            <FormLabel>Display Name</FormLabel>
            <Input
              placeholder="John Doe"
              variant="filled"
              mb={3}
              type="text"
              background={inputBackground}
              shadow="sm"
              {...register("display_name")}
            />
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="johndoe@email.com"
              variant="filled"
              mb={3}
              type="email"
              background={inputBackground}
              shadow="sm"
              {...register("email")}
            />
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="********"
              variant="filled"
              mb={6}
              type="password"
              background={inputBackground}
              shadow="sm"
              {...register("password")}
            />
            <Button type="submit" width={"100%"} mb={6} colorScheme="teal">
              Submit
            </Button>
          </form>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
