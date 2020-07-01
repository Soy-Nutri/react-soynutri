import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import icon from "../resources/icon.png";

// components
import UserMenu from "./UserMenu";
import ControlMenu from "./ControlMenu";
import DailyDietMenu from "./DailyDietMenu";
import WeeklyDietMenu from "./WeeklyDietMenu";

const NavbarStyled = styled.div`
  .nav-title {
    font-family: yellowtail;
    font-size: 1.6em;
  }
  img {
    height: 35px;
    width: 35px;
    margin-right: 4px;
  }
`;

export default function Navbar() {
  return (
    <NavbarStyled>
      <Grid container>
        <AppBar position="fixed" color="primary">
          <Toolbar className="toolbar">
            <Grid item xs={0} sm={1}></Grid>
            <Grid item container xs={12} sm={10}>
              <img src={icon} alt="" />
              <Typography className="nav-title">SoyNutri</Typography>
              <UserMenu />
              <ControlMenu />
              <DailyDietMenu />
              <WeeklyDietMenu />
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </NavbarStyled>
  );
}
