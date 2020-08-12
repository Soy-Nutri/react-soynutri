import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

// material ui stuff
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { esEs } from "@material-ui/core/locale";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Navbar from "./components/navbar/Navbar";
import Error from "./components/Error";
import HomeDashboard from "./components/HomeDashboard";
import Login from "./components/forms/Login";

//patient
import AddPatient from "./components/forms/patient/AddPatient";
import SeePatient from "./components/views/patient/SeePatient";
import ModifyPatient from "./components/forms/patient/ModifyPatient";
import DeletePatient from "./components/forms/patient/DeletePatient";
import SearchPatient from "./components/views/patient/SearchPatient";
//Patient documents
import PatientControl from "./components/patients/Control";
import PatientDailyDiets from "./components/patients/DailyDiets";
import PatientWeeklyDiets from "./components/patients/WeeklyDiets";

// controls
import AddControl from "./components/forms/control/AddControl";
import ModifyControl from "./components/forms/control/ModifyControl";

// daily diets
import AddDailyDiet from "./components/forms/dailydiet/AddDailyDiet";
import ModifyDailyDiet from "./components/forms/dailydiet/ModifyDailyDiet";

//Weekly diets

import WeeklyDiet from "./components/forms/weeklydiet/AddWeeklyDiet";
import ModifyWeeklyDiet from "./components/forms/weeklydiet/ModifyWeeklyDiet";
import DeleteWeeklyDiet from "./components/forms/weeklydiet/DeleteWeeklyDiet";


// axios
import axios from "axios";

// redux
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import { logoutUser } from "./redux/ducks/authDucks";

// profile
import Profile from "./components/patients/Profile";

axios.defaults.baseURL =
  "https://us-central1-back-f0378.cloudfunctions.net/api";
//axios.defaults.baseURL = "https://pokeapi.co/api/v2";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? purple[500] : "#58157c";
  const mainSecondaryColor = darkState ? deepPurple[500] : deepPurple[900];

  const theme = createMuiTheme(
    {
      palette: {
        type: palletType,
        primary: {
          main: mainPrimaryColor,
        },
        secondary: {
          main: mainSecondaryColor,
        },
      },
    },
    esEs
  );

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  React.useEffect(() => {
    const getInfo = () => {
      setDarkState(prefersDarkMode ? true : false);
    };
    getInfo();
  }, [prefersDarkMode, setDarkState]);

  const store = generateStore();

  // get the token when the app starts
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (localStorage.rol === "/soynutri-adm") {
      if ((decodedToken.auth_time + 86400) * 1000 < Date.now()) {
        // 1 day of expiration for admin
        store.dispatch(logoutUser());
        window.location.href = "/login";
      } else {
        axios.defaults.headers.common["Authorization"] = token;
      }
    } else if ((localStorage.rol = "/patient")) {
      // 30 days of expiration for patient
      if ((decodedToken.auth_time + 86400 * 30) * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
      } else {
        axios.defaults.headers.common["Authorization"] = token;
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <Navbar darkState={darkState} handleThemeChange={handleThemeChange} />

          <Switch>
            <Route path="/" exact component={HomeDashboard} />

            <Route path="/login" component={Login} />

            <Route path="/agregar_paciente" exact component={AddPatient} />
            <Route path="/buscar_paciente" exact component={SearchPatient} />
            <Route path="/ver_paciente/:rut" exact component={SeePatient} />
            <Route
              path="/modificar_paciente/:rut"
              exact
              component={ModifyPatient}
            />
            <Route path="/borrar_paciente" exact component={DeletePatient} />

            <Route path="/agregar_control" exact component={AddControl} />
            <Route path="/modificar_control" exact component={ModifyControl} />

            <Route
              path="/agregar_pauta_diaria"
              exact
              component={AddDailyDiet}
            />
            <Route
              path="/modificar_pauta_diaria"
              exact
              component={ModifyDailyDiet}
            />
            <Route path="/carnet" exact component={PatientControl} />
            <Route path="/pauta_diaria" exact component={PatientDailyDiets} />
            <Route
              path="/minuta_semanal"
              exact
              component={PatientWeeklyDiets}
            />
            <Route path="/perfil" exact component={Profile} />

            <Route path="/agregar_minuta_semanal" exact component = {WeeklyDiet} />
            <Route path="/modificar_minuta_semanal" exact component = {ModifyWeeklyDiet} />
            <Route path="/eliminar_minuta_semanal" exact component = {DeleteWeeklyDiet} />

            <Route component={Error}></Route>
          </Switch>
        </Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
