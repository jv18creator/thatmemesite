import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { GTM_ID, pageview } from "../lib/gtm";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "../contexts/user.context";
import theme from "../helpers/theme/theme";
import "@fontsource/noto-sans";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
