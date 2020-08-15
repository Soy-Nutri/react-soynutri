import React from "react";

import PatientMenu from "./menus/PatientMenu";
import ControlMenu from "./menus/ControlMenu";
import DailyDietMenu from "./menus/DailyDietMenu";
import WeeklyDietMenu from "./menus/WeeklyDietMenu";

export default function AdminLinks() {
  return (
    <>
      <PatientMenu />
      <ControlMenu />
      <DailyDietMenu />
      <WeeklyDietMenu />
    </>
  );
}
