import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import icon from "../../resources/icon.png";

import { Link } from "react-router-dom";

// components
import UserMenu from "./menus/UserMenu";
import ControlMenu from "./menus/ControlMenu";
import DailyDietMenu from "./menus/DailyDietMenu";
import WeeklyDietMenu from "./menus/WeeklyDietMenu";
import DrawerMenu from "./menus/drawer/Drawer";

const NavbarStyled = styled.div`
  .nav-title {
    font-family: yellowtail;
    font-size: 1.6em;
    margin-right: 1em;
  }
  img {
    height: 35px;
    width: 35px;
    margin-right: 4px;
  }

  .flex {
    display: inline-flex;
    text-align: center;
    text-decoration: none;
    color: white;
  }
  .menu-container {
    display: inline-flex;
  }
  @media screen and (max-width: 1152px) {
    .flex {
      margin-left: auto;
      margin-right: auto;
    }
    .menu-container {
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media screen and (max-width: 768px) {
    .menu-container {
      display: none;
    }
    .flex {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export default function Navbar() {
  return (
    <NavbarStyled>
      <Grid container>
        <AppBar position="sticky" color="primary">
          <Toolbar className="toolbar">
            <Grid item xs={0} sm={1}></Grid>
            <DrawerMenu />
            <Grid item container xs={12} sm={10}>
              <Link className="flex" to="/">
                <img src={icon} alt="" />
                <Typography className="nav-title">SoyNutri</Typography>
              </Link>
              <div className="menu-container">
                <UserMenu />
                <ControlMenu />
                <DailyDietMenu />
                <WeeklyDietMenu />
              </div>
            </Grid>
            <Grid item xs={0} sm={1}></Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </NavbarStyled>
  );
}
