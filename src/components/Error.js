import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ErrorStyled = styled.div``;

export default function Error() {
  return (
    <ErrorStyled>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h1"
              color="primary"
              style={{ textAlign: "center", marginTop: 150 }}
            >
              Error 404
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="primary"
              style={{ textAlign: "center", marginBottom: 40 }}
            >
              Página no encontrada
            </Typography>
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Button variant="outlined" color="primary" href="/">
              Ir al inicio
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ErrorStyled>
  );
}
