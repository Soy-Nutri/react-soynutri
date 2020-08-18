import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const PatientDashboardStyled = styled.div`
  .aws-btn {
    --slider-height-percentage: 90%;
    --slider-transition-duration: 500ms;
    --organic-arrow-thickness: 4px;
    --organic-arrow-border-radius: 0px;
    --organic-arrow-height: 40px;
    --organic-arrow-color: #26456f;
    --control-button-width: 10%;
    --control-button-height: 25%;
    --control-button-background: transparent;
    --control-bullet-color: #2d5182;
    --control-bullet-active-color: #26456f;
    --loader-bar-color: #851515;
    --loader-bar-height: 6px;
  }
  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }
`;

export default function PatientDashboard() {
  return (
    <PatientDashboardStyled>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              className="title"
              variant="h5"
              color="primary"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              Bienvenido de vuelta!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="primary"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              {localStorage.name}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <AutoplaySlider
          className="aws-btn"
          play={true}
          cancelOnInteraction={false}
          interval={2000}
        >
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F7.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F1.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F2.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F3.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F4.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F5.jpg?alt=media" />
          <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F6.jpg?alt=media" />
        </AutoplaySlider>
      </Container>
      <Container maxWidth="md" style={{ marginTop: 90 }}>
        <Footer />
      </Container>
    </PatientDashboardStyled>
  );
}
