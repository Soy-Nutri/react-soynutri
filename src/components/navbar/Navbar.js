import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import icon from "../../resources/icon.png";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { Link } from "react-router-dom";

// components
import AdminLinks from "./AdminLinks";
import PatientLinks from "./PatientLinks";
import DrawerMenu from "./menus/drawer/Drawer";
import IconButton from "@material-ui/core/IconButton";

// icons
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Brightness2Icon from "@material-ui/icons/Brightness2";

// redux
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/ducks/authDucks";

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
    min-width: 32px;
    &:hover {
      cursor: pointer;
    }
  }

  .card {
    min-width: 275px;
  }

  .popper {
    background-color: red;
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();

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
                {localStorage.rol === "/soynutri-adm" ? (
                  <AdminLinks />
                ) : localStorage.rol === "/patient" ? (
                  <PatientLinks />
                ) : (
                  <div></div>
                )}
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
            {localStorage.getItem("rol") === "/soynutri-adm" ? (
              <Button aria-describedby={id} onClick={handleClick}>
                Admin
              </Button>
            ) : localStorage.getItem("rol") === "/patient" ? (
              <div className="avatar2" onClick={handleClick}>
                <div style={{ textAlign: "center" }}>{localStorage.nick}</div>
              </div>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="text" color="default" size="small">
                  Iniciar sesión
                </Button>
              </Link>
            )}

            <Grid item xs={false} sm={1}></Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Card className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {localStorage.getItem("rol") === "/soynutri-adm"
                ? "Administrador"
                : localStorage.getItem("rol") === "/patient"
                ? "paciente"
                : "invitado"}
            </Typography>
            <Typography color="textSecondary">adjective</Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              style={{ marginLeft: "auto" }}
              size="small"
              onClick={() => dispatch(logoutUser())}
            >
              Cerrar sesión
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </NavbarStyled>
  );
}
