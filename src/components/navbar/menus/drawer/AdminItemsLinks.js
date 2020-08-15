import React from "react";
import styled from "styled-components";

import PatientItem from "./Items/PatientItem";
import ControlItem from "./Items/ControlItem";
import DailyDietItem from "./Items/DailyDietItem";
import WeeklyDietItem from "./Items/WeeklyDietItem";

const AdminItemsLinksStyled = styled.div``;

export default function AdminItemsLinks(props) {
  return (
    <AdminItemsLinksStyled>
      <PatientItem handleDrawerClose={props.handleDrawerClose} />
      <ControlItem handleDrawerClose={props.handleDrawerClose} />
      <DailyDietItem handleDrawerClose={props.handleDrawerClose} />
      <WeeklyDietItem handleDrawerClose={props.handleDrawerClose} />
    </AdminItemsLinksStyled>
  );
}
