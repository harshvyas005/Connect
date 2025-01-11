import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#CAD5E2",
    },
    secondary: {
      main: "#5A20CB",
    },
    background: {
      main: "#000000",
      default: "#0D0D0D",
      paper: "#0D0D0D",
    },

    textColor: {
      main: "#111111",
    },
  },
});

export default darkTheme;
