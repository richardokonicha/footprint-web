import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    blueprint: {
      50: "#EBF3FA",
      100: "#C7DFF0",
      200: "#A2CAE6",
      300: "#7EB5DD",
      400: "#5AA1D3",
      500: "#368CC9",
      600: "#2B70A1",
      700: "#205479",
      800: "#153851",
      900: "#0B1C28",
    },
    gray: {
      50: "#f7fafc",
      // ...
      900: "#171923",
    },
    // ...
  },
});

export default theme;
