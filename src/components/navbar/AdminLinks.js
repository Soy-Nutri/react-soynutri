import React from "react";

import UserMenu from "./menus/PatientMenu";
import ControlMenu from "./menus/ControlMenu";
import DailyDietMenu from "./menus/DailyDietMenu";
import WeeklyDietMenu from "./menus/WeeklyDietMenu";

export default function AdminLinks() {
  return (
    <>
      <UserMenu />
      <ControlMenu />
      <DailyDietMenu />
      <WeeklyDietMenu />
    </>
  );
}
