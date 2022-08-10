import {
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../components/Globals/FormFields/InputField";
import { UserContext } from "../contexts/user.context";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUpPage = () => {
  const navigate = useRouter();
  const methods = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
    },
  });

  const formBackground = useColorModeValue("gray.100", "gray.700");
  const inputBackground = useColorModeValue("#fff", "#000");
  const { fetchUser, emailPasswordSignup } = useContext(UserContext);

  const onUserSignUp = async (data) => {
    gtag.event({
      action: "user_creation_form",
      category: "Auth",
      label: "",
    });

    try {
      const user = await emailPasswordSignup(data.email, data.password);
      console.log(`user signed up`, user);
      const fetchedUser = await fetchUser();

      const appUser = {
        accessToken: fetchedUser.accessToken,
        customData: fetchedUser.customData,
        id: fetchedUser.id,
        refreshToken: fetchedUser.refreshToken,
        state: fetchedUser.state,
        profile: {
          data: fetchedUser.profile,
          identities: fetchedUser.identities,
        },
      };

      if (!isEmpty(fetchedUser)) {
        await fetch("/api/signup", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          body: JSON.stringify({
            ...appUser,
            display_name: data.display_name,
          }),
        })
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => console.error(`err`, err));
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return (
    <Flex height={"100vh"} alignItems="center" justifyContent={"center"}>
      <Flex
        shadow="lg"
        direction={"column"}
        background={formBackground}
        p={12}
        rounded={6}
        maxWidth="720px"
        w={["90%", "75%", "50%"]}
      >
        <FormControl>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onUserSignUp)}>
              <Heading mb={6}>Sign Up</Heading>
              <InputField
                formLabel="Display Name"
                name={"display_name"}
                type="text"
                placeholder={"John Doe"}
                inputBackground={inputBackground}
                rules={{
                  required: "Please enter your name",
                }}
              />
              <InputField
                formLabel="Email"
                name={"email"}
                type="email"
                placeholder="johndoe@email.com"
                inputBackground={inputBackground}
                rules={{
                  required: "Please enter your email address",
                }}
              />
              <InputField
                formLabel="Password"
                name={"password"}
                type="password"
                placeholder="********"
                inputBackground={inputBackground}
                rules={{
                  required: "Please enter password",
                }}
              />

              <Button type="submit" width={"100%"} mb={6} colorScheme="teal">
                Submit
              </Button>
            </form>
          </FormProvider>
        </FormControl>
        <Text align={"end"} fontSize="sm" cursor="pointer">
          <Link href={"login"}>Already a user? SIGN IN!!!</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
