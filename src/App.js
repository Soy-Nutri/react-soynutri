import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// material ui stuff
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Navbar from "./components/navbar/Navbar";
import Error from "./components/Error";
import HomeDashboard from "./components/HomeDashboard";

//patient
import AddPatient from "./components/forms/patient/AddPatient";
//import SeePatient from "./components/views/patient/SeePatient";
import ModifyPatient from "./components/forms/patient/ModifyPatient";
import DeletePatient from "./components/forms/patient/DeletePatient";
import SearchPatient from "./components/views/patient/SearchPatient";

// controls
import AddControl from "./components/forms/control/AddControl";
import ModifyControl from "./components/forms/control/ModifyControl";

// daily diets
import AddDailyDiet from "./components/forms/dailydiet/AddDailyDiet";
import ModifyDailyDiet from "./components/forms/dailydiet/ModifyDailyDiet";

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

          <Route path="/agregar_paciente" exact component={AddPatient} />
          <Route path="/ver_paciente" exact component={SearchPatient} />
          <Route path="/modificar_paciente" exact component={ModifyPatient} />
          <Route path="/borrar_paciente" exact component={DeletePatient} />

          <Route path="/agregar_control" exact component={AddControl} />
          <Route path="/modificar_control" exact component={ModifyControl} />

          <Route path="/agregar_pauta_diaria" exact component={AddDailyDiet} />
          <Route
            path="/modificar_pauta_diaria"
            exact
            component={ModifyDailyDiet}
          />
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
