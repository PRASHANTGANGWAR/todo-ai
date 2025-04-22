import { createTheme } from "@mui/material";

const demoTheme = createTheme({
    colorSchemes: { light: true },
    cssVariables: {
      colorSchemeSelector: "class",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  export default demoTheme