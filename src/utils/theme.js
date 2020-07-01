import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#58157c",
      light: "#ab47bc",
      dark: "#4a148c",
      contrastText: "#fff",
    },
  },
  typography: {
    handwrite: {
      fontFamily: "./yellowtail",
    },
  },
});

export default theme;
