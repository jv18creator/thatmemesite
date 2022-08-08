import React, { useContext, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../components/Globals/FormFields/InputField";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/user.context";
import { ERROR_TEXT_CLR } from "../styles/globalColorTheme";

const Login = () => {
  const navigate = useRouter();
  const methods = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const inputBackground = useColorModeValue("#fff", "#000");
  const { emailPasswordLogin } = useContext(UserContext);
  const [dbError, setDbError] = useState("");

  const onUserLogIn = async (data) => {
    try {
      const response = await emailPasswordLogin(data.email, data.password);
      navigate.push("/");
    } catch (error) {
      setDbError(error.error);
      console.log("login error", error);
    }
  };

  return (
    <>
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
              <form onSubmit={methods.handleSubmit(onUserLogIn)}>
                <Heading mb={6}>Log In</Heading>
                {dbError ? (
                  <Heading
                    mb={2}
                    fontSize="xl"
                    textAlign={"center"}
                    color={ERROR_TEXT_CLR}
                  >
                    {dbError}
                  </Heading>
                ) : null}

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
          <Text
            align={"end"}
            fontSize="sm"
            onClick={() => navigate.push("/sign-up")}
            cursor="pointer"
          >
            Not a user? Create an account!!!
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
