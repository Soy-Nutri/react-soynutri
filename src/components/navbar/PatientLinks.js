import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import AssignmentIcon from "@material-ui/icons/Assignment";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";

const PatientLinksStyled = styled.div`
  .icon {
    margin-right: 0.2em;
  }
  .item-button {
    margin-left: 1em;
    margin-right: 1em;
  }
`;

export default function PatientLinks() {
  return (
    <PatientLinksStyled>
      <Button variant="text" color="default" className="item-button">
        <AssignmentIcon fontSize="inherit" className="icon" />
        Mi carnet de control
      </Button>

      <Button variant="text" color="default" className="item-button">
        <TodayIcon fontSize="inherit" className="icon" />
        Mi pauta diaria
      </Button>

      <Button variant="text" color="default" className="item-button">
        <DateRangeIcon fontSize="inherit" className="icon" />
        Mi minuta semanal
      </Button>
    </PatientLinksStyled>
  );
}
