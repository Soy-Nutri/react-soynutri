import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import AssignmentIcon from "@material-ui/icons/Assignment";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";

const PatientItemsLinksStyled = styled.div``;

export default function PatientItemsLinks(props) {
  return (
    <PatientItemsLinksStyled>
      <ListItem
        button
        onClick={props.handleDrawerClose}
        className=""
        component={Link}
        to="/carnet"
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Mi carnet de control" />
      </ListItem>

      <ListItem
        button
        onClick={props.handleDrawerClose}
        className=""
        component={Link}
        to="/pauta_diaria"
      >
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Mi pauta diaria" />
      </ListItem>

      <ListItem
        button
        onClick={props.handleDrawerClose}
        className=""
        component={Link}
        to="/minuta_semanal"
      >
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Mi minuta semanal" />
      </ListItem>
    </PatientItemsLinksStyled>
  );
}
