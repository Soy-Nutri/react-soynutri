import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import icon from "../../resources/icon.png";

import { Link } from "react-router-dom";

// components
import AdminLinks from "./AdminLinks";
import PatientLinks from "./PatientLinks";
import DrawerMenu from "./menus/drawer/Drawer";
import IconButton from "@material-ui/core/IconButton";

// icons
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const NavbarStyled = styled.div`
  margin-bottom: 3em;
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
    margin-left: auto;
    margin-right: auto;
  }
  .avatar {
    margin-left: 5px;
    color: white;
  }
  .avatar2 {
    border: solid 0.8px white;
    border-radius: 50%;
    border-color: plum;
    padding: 5px;
    margin-left: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1152px) {
    .flex {
      margin-left: auto;
      margin-right: auto;
      margin-top: 0.5em;
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

export default function Navbar(props) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <NavbarStyled>
      <Grid container>
        <AppBar position="sticky" color="primary">
          <Toolbar className="toolbar">
            <Grid item xs={false} sm={1}></Grid>
            <DrawerMenu />
            <Grid item container xs={12} sm={10}>
              <Link className="flex" to="/">
                <img src={icon} alt="" />
                <Typography className="nav-title">SoyNutri</Typography>
              </Link>
              <div className="menu-container">
                <AdminLinks />
                {/* <PatientLinks /> */}
              </div>
            </Grid>
            <IconButton
              onClick={props.handleThemeChange}
              children={
                props.darkState ? (
                  <BrightnessHighIcon />
                ) : (
                  <Brightness2Icon style={{ color: "white" }} />
                )
              }
            ></IconButton>
            <div className="avatar2">NN</div>
            <Chip
              className="avatar"
              variant="outlined"
              label="NN"
              onClick={handleClick}
            />
            <Grid item xs={false} sm={1}></Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </NavbarStyled>
  );
}
