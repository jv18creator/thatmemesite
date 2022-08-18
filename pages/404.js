import Link from "next/link";
import { Flex, Button } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      alignItems="center"
      justifyContent={"center"}
      gap={2}
    >
      <h1>Oops - Page Not Found</h1>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </Flex>
  );
}
