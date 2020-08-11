import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

import { Link } from "react-router-dom";

// components
import AdminItemsLinks from "./AdminItemsLinks";
import PatientItemsLinks from "./PatientItemsLinks";

// icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(768)]: {
      display: "none",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  },
}));

export default function DrawerMenu() {
  //Function hide drawer with click outside
  function useOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleDrawerClose();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  //Vars Function hide drawer
  const wrapperRef = useRef(null);
  useOutside(wrapperRef);
  // End vars

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className={classes.root} ref={wrapperRef}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem onClick={handleDrawerClose} button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>

          {localStorage.rol === "/soynutri-adm" ? (
            <AdminItemsLinks handleDrawerClose={handleDrawerClose} />
          ) : localStorage.rol === "/patient" ? (
            <PatientItemsLinks handleDrawerClose={handleDrawerClose} />
          ) : (
            <div></div>

          )}
        </List>
      </Drawer>
    </div>
  );
}
