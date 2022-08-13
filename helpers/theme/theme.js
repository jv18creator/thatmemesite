// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    body: "Noto Sans",
  },
  colors: {
    primary: "#66BFBF",
    secondary: "#FF0063",
    light_primary: "#EAF6F6",
    like_heart: "#EC4856",
  },
});

export default theme;
