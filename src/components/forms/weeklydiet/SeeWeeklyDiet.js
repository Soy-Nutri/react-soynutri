import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

/*
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
*/

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

//import ListItemIcon from "@material-ui/core/ListItemIcon";

import Table from "./TableWeekly";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllWeeklyDiets } from "../../../redux/ducks/weeklyDietsDucks";
import { getPatientInfo } from "../../../redux/ducks/patientsDucks";

const SeeWeeklyDietStyled = styled.div`
  /* Hidde spinner number input Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hidde spinner number input Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  /* ------- */
  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1em;
  }

  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }

  @media screen and (min-width: 600px) {
    .MuiGrid-root.margin.MuiGrid-item.MuiGrid-grid-md-1,
    .MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-1 {
      display: none;
    }
    .texto {
      margin-right: 0.2px;
    }
    .semana {
      margin-top: 15px;
      margin-left: 15px;
    }
    .hola {
      margin-left: 0px;
    }
    .lunch-picker {
      margin-right: 0.1px;
    }

    .grid-invisible {
      display: none;
    }
  }
  @media screen and (min-width: 960px) {
    .grid-invisible {
      display: block;
    }
  }
`;

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SeeWeeklyDiet({ match }) {
  const dispatch = useDispatch();

  const weeklyDiets = useSelector((store) => store.weeklyDiets.getweeklyDiets);
  const weeklyDietError = useSelector((store) => store.weeklyDiets.errors);
  const [rowsEmpty, setRowsEmpty] = React.useState(false);

  console.log("Error");
  console.log(weeklyDietError);

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  React.useEffect(() => {
    dispatch(getPatientInfo(match.params.rut));
    dispatch(getAllWeeklyDiets(match.params.rut));
  }, [dispatch, match]);

  var rows = [];

  if (weeklyDiets && weeklyDiets.length > 0) {
    console.log("TOY ACA:  \n", weeklyDiets.length);
    for (let i = 0; i < weeklyDiets.length; i++) {
      console.log(getFecha(weeklyDiets[i].date));
      rows.push({
        date: getFecha(weeklyDiets[i].date),
        action: "delete",
        dateF: weeklyDiets[i].date,
      });
    }
  }
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const cleanControl = () => {
    setRowsEmpty(true);
    setOpenSnackbar(true);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <SeeWeeklyDietStyled>
      <div>
        <Grid container justify="center">
          <Typography className="title" variant="h5" color="primary">
            Ver minuta semanal
          </Typography>
        </Grid>

        <br></br>

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} className="semana">
            {(weeklyDiets && weeklyDiets[0] === "error") || rowsEmpty ? (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <h2>Este usuario no tiene minutas semanales aún.</h2>
              </Grid>
            ) : weeklyDiets && weeklyDiets.length > 0 ? (
              <Table weeklyDiets={weeklyDiets}></Table>
            ) : (
              <Grid container justify="center" style={{ marginTop: 20 }}>
                <Grid item container>
                  <Grid item xs={false} sm={3}></Grid>

                  <Grid item xs={12} sm={6}>
                    <Skeleton
                      variant="rect"
                      height={200}
                      style={{ borderRadius: "5px" }}
                    />
                  </Grid>
                  <Grid item xs={false} sm={3}></Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </SeeWeeklyDietStyled>
  );
}
