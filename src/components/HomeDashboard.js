import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardDashboard from "./CardDashboard";

const HomeDashboardStyled = styled.div``;

export const GeneralInfo = () => {
  return (
    <React.Fragment>
      <Container>
        <Grid container>
          <Grid item md={12}>
            <CardDashboard />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default function HomeDashboard() {
  return <HomeDashboardStyled>{GeneralInfo()}</HomeDashboardStyled>;
}
