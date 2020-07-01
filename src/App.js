import React from "react";
import "./App.css";

// components
import Navbar from "./components/Navbar";

// material ui stuff
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
