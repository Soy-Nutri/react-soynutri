import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// icons
import TodayIcon from "@material-ui/icons/Today";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DailyDietItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Pautas diarias" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/buscar_paciente/agregar_pauta_diaria"
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar pauta diaria" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/buscar_paciente/ver_pauta_diaria"
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Ver pauta diaria" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/buscar_paciente/modificar_pauta_diaria"
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar pauta diaria" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/buscar_paciente/eliminar_pauta_diaria"
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar pauta diaria" />
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
}
