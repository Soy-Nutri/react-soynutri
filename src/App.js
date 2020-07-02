import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Navbar from "./components/navbar/Navbar";
import HomeDashboard from "./components/HomeDashboard";

// material ui stuff
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomeDashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
