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
import AssignmentIcon from "@material-ui/icons/Assignment";
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

export default function ControlItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Controles" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/agregar_control"
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Agregar control" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/buscar_control"
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Ver control" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/modificar_control"
          >
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar control" />
          </ListItem>
          <ListItem
            button
            onClick={props.handleDrawerClose}
            className={classes.nested}
            component={Link}
            to="/eliminar_control"
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar control" />
          </ListItem>
        </List>
      </Collapse>
    </Fragment>
  );
}
