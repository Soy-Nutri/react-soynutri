import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

/*
import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
*/

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import Table from "./TableWeekly";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getWeeklyDiets } from "../../../redux/ducks/weeklyDietsDucks";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SeeWeeklyDiet() {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [rut, setRut] = React.useState("");

  const weeklyDiets = useSelector((store) => store.weeklyDiets.getweeklyDiets);

  const weeklyDietError = useSelector((store) => store.weeklyDiets.errors);

  console.log(weeklyDiets);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const searchPatientsWeekly = () => {
    dispatch(getWeeklyDiets(rut));
  };

  const handleChangeRut = (event) => {
    setRut(event.target.value);
  };

  const reqmsg = "Campo obligatorio";

  //Cambiar las horas a las dadas por firebase.
  // function generate(element) {
  //   return [0, 1, 2].map((value) =>
  //       React.cloneElement(element, {
  //       key: value,
  //       }),
  //   );
  // }

  // function prettyTime(date) {
  //   // this function makes de datetype date in a "HH:MM" format
  //   return date.toLocaleTimeString(navigator.language, {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // }

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

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} md={4} lg={4}>
            <TextField
              value={rut}
              name="rut"
              type="text"
              label="Rut (Sin puntos ni guión)"
              variant="outlined"
              margin="dense"
              fullWidth
              onChange={handleChangeRut}
              error={errors.rut}
              helperText={errors.rut ? errors.rut.message : ""}
              inputRef={register({
                required: { value: true, message: reqmsg },
              })}
            />
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              onClick={() => searchPatientsWeekly()}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>

        <br></br>

        <Grid container justify="center" spacing={isMobile ? 0 : 2}>
          <Grid item xs={12} sm={8} className="semana">
            {weeklyDiets && weeklyDiets.length > 0 && (
              <Table weeklyDiets={weeklyDiets}></Table>
            )}
          </Grid>
        </Grid>
      </div>
    </SeeWeeklyDietStyled>
  );
}
