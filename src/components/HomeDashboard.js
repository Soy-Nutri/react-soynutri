import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import GuestDashboard from "./GuestDashboard";
import AdminDashboard from "./AdminDashboard";
import PatientDashboard from "./PatientDashboard";

const HomeDashboardStyled = styled.div``;

export default function HomeDashboard() {
  return (
    <HomeDashboardStyled>
      {localStorage.getItem("rol") === "/soynutri-adm" ? (
        <AdminDashboard />
      ) : localStorage.getItem("rol") === "/patient" ? (
        <PatientDashboard />
      ) : (
        <Container>
          <Grid container>
            <Grid item md={12}>
              <GuestDashboard />
            </Grid>
          </Grid>
        </Container>
      )}
    </HomeDashboardStyled>
  );
}
