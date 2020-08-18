import React from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/ducks/authDucks";

const AddPatientStyled = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: purple;
    -webkit-box-shadow: 0 0 0px 1000px #a9a9a9 inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  margin-bottom: 2em;
  .form {
    margin-left: 1em;
    margin-right: 1em;
  }
  .form-button {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
  }
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: theme.primary,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddPatient() {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const loginError = useSelector((state) => state.auth.error);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // redux
  const dispatch = useDispatch();
  const onSubmit = (userData) => {
    if (!loading) {
      setLoading(true);
      dispatch(loginUser(userData));
      handleOpen();
    }
  };

  React.useEffect(() => {
    if (loginError) {
      setLoading(false);
    }
  }, [loginError]);

  const reqmsg = "Campo obligatorio";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <AddPatientStyled>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container justify="center">
          <Typography className="title" variant="h5" color="primary">
            Inicia sesión en SoyNutri
          </Typography>
        </Grid>

        <Grid container>
          <Grid item container justify="center" spacing={isMobile ? 0 : 2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="rut"
                type="text"
                label="Rut"
                variant="outlined"
                margin="dense"
                fullWidth
                error={errors.rut}
                helperText={
                  errors.rut ? errors.rut.message : "Sin puntos ni guión"
                }
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
          </Grid>

          <Grid item container justify="center" spacing={isMobile ? 0 : 2}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                name="password"
                type="password"
                label="Contraseña"
                variant="outlined"
                margin="dense"
                fullWidth
                error={errors.password}
                helperText={errors.password ? errors.password.message : ""}
                inputRef={register({
                  required: { value: true, message: reqmsg },
                })}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <div className={classes.wrapper}>
            <Button
              className="form-button"
              variant="outlined"
              type="submit"
              color="primary"
              disabled={loading}
            >
              Iniciar Sesión
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </form>
      {loginError && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {loginError}
          </Alert>
        </Snackbar>
      )}
    </AddPatientStyled>
  );
}
