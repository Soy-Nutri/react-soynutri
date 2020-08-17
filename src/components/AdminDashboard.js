import React from "react";
import styled from "styled-components";
import { Pie, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getStatistics } from "../redux/ducks/patientsDucks";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const AdminDashboardStyled = styled.div`
  .chart-title {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 975px) {
    .chartjs-render-monitor {
      min-width: 550px;
    }
  }
`;

function getColors(stops) {
  let colors = [];
  for (let i = 0; i < stops; i++) {
    let c = i / stops;
    let randomColor = rainbowStop(c, 1, 0.5);
    //while (colors.includes(randomColor)) randomColor = rainbowStop(c, 1, 0.5);
    if (colors.includes("#ffffff")) randomColor = rainbowStop(c, 1, 0.5);
    colors.push(randomColor);
  }
  return colors;
}

function rainbowStop(h) {
  let f = (n, k = (n + h * 12) % 12) =>
    0.5 - 0.5 * Math.max(Math.min(k - 2, 4 - k, 1), -1);
  let rgb2hex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, 0)
      )
      .join("");
  return rgb2hex(f(0), f(8), f(4));
}

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.patients.statistics);

  React.useEffect(() => {
    dispatch(getStatistics());
  }, [dispatch]);
  return (
    <AdminDashboardStyled>
      {statistics && (
        <Container maxWidth="lg">
          <Grid container justify="center" spacing={1}>
            <Grid container spacing={1} justify="center">
              <Typography
                variant="h2"
                color="primary"
                style={{ fontFamily: "yellowtail", textAlign: "center" }}
              >
                Estadisticas de pacientes
              </Typography>
            </Grid>
            <Typography
              variant="h5"
              color="primary"
              style={{ marginBottom: "50px" }}
            >
              Cantidad total de pacientes: {statistics.nPatients}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item container justify="center">
              <Grid item>
                <Typography
                  variant="h6"
                  color="primary"
                  className="chart-title"
                >
                  Edades de los pacientes
                </Typography>
                <Pie
                  data={{
                    labels: Object.keys(statistics.age),
                    datasets: [
                      {
                        label: ["Edad"],
                        data: Object.values(statistics.age),
                        backgroundColor: getColors(
                          Object.keys(statistics.age).length
                        ),
                        borderWidth: 2,
                        borderColor: "RGB(48,48,48)",
                        hoverBorderWidth: 3,
                      },
                    ],
                    options: {
                      animation: {
                        animateScale: true,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  color="primary"
                  className="chart-title"
                >
                  Tipo de alimentación
                </Typography>
                <Pie
                  data={{
                    labels: Object.keys(statistics.alimentation),
                    datasets: [
                      {
                        label: ["Alimentación"],
                        data: Object.values(statistics.alimentation),
                        backgroundColor: getColors(
                          Object.keys(statistics.alimentation).length
                        ),
                        borderWidth: 2,
                        borderColor: "RGB(48,48,48)",
                        hoverBorderWidth: 3,
                      },
                    ],
                    options: {
                      animation: {
                        animateScale: true,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container justify="center">
              <Grid item>
                <Typography
                  variant="h6"
                  color="primary"
                  className="chart-title"
                >
                  Sexo de los pacientes
                </Typography>
                <Bar
                  data={{
                    labels: ["Femenino", "Masculino"],
                    datasets: [
                      {
                        label: "Cantidad de pacientes",
                        data: Object.values(statistics.sex),
                        backgroundColor: "#007fe0",
                        barThickness: 100,
                        borderWidth: 2,
                        borderColor: "RGB(48,48,48)",
                        hoverBorderWidth: 3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            autoSkip: true,
                            beginAtZero: true,
                            stepSize: 1,
                          },
                          gridLines: {
                            display: false,
                          },
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false,
                          },
                        },
                      ],
                    },
                    pan: {
                      enabled: true,
                      mode: "xy",
                      speed: 10,
                    },
                    zoom: {
                      enabled: true,
                      drag: false,
                      mode: "xy",
                      rangeMin: {
                        x: 0,
                        y: 0,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  color="primary"
                  className="chart-title"
                >
                  Ciudades de los pacientes
                </Typography>
                <Pie
                  data={{
                    labels: Object.keys(statistics.city),
                    datasets: [
                      {
                        label: ["Alimentación"],
                        data: Object.values(statistics.city),
                        backgroundColor: getColors(
                          Object.keys(statistics.city).length
                        ),
                        borderWidth: 2,
                        borderColor: "RGB(48,48,48)",
                        hoverBorderWidth: 3,
                      },
                    ],
                    options: {
                      animation: {
                        animateScale: true,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </AdminDashboardStyled>
  );
}
