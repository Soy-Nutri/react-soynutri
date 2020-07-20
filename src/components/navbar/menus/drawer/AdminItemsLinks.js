import React from "react";

import UserItem from "./Items/PatientItem";
import ControlItem from "./Items/ControlItem";
import DailyDietItem from "./Items/DailyDietItem";
import WeeklyDietItem from "./Items/WeeklyDietItem";

export default function AdminItemsLinks(props) {
  return (
    <>
      <UserItem handleDrawerClose={props.handleDrawerClose} />
      <ControlItem handleDrawerClose={props.handleDrawerClose} />
      <DailyDietItem handleDrawerClose={props.handleDrawerClose} />
      <WeeklyDietItem handleDrawerClose={props.handleDrawerClose} />
    </>
  );
}
