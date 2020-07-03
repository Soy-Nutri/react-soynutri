import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Navbar from "./components/navbar/Navbar";
import HomeDashboard from "./components/HomeDashboard";
import AddUser from "./components/forms/user/AddUser";
import Error from "./components/Error";

// material ui stuff
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? purple[500] : "#58157c";
  const mainSecondaryColor = darkState ? deepPurple[500] : deepPurple[900];
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  React.useEffect(() => {
    const obtenerInfo = () => {
      setDarkState(prefersDarkMode ? true : false);
    };
    obtenerInfo();
  }, [prefersDarkMode, setDarkState]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar darkState={darkState} handleThemeChange={handleThemeChange} />

        <Switch>
          <Route path="/" exact component={HomeDashboard} />
          <Route path="/agregar_usuario" exact component={AddUser} />
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
