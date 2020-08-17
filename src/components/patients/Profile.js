import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CreateIcon from "@material-ui/icons/Create";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

//redux
import {
  getPatientInfoPatient,
  modifyPassword,
} from "../../redux/ducks/patientsDucks";
import { useDispatch, useSelector } from "react-redux";

const SeePatientStyled = styled.div`
  /* .card {
    min-width: 500px;
  }
  .container {
    display: flex;
    justify-content: center; 
  }*/
  hr {
    border: 1px solid grey;
  }
`;

function getDate(date) {
  let newDate = new Date(date);
  let month = newDate.getMonth().toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

function Profile() {
  const dispatch = useDispatch();
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  const passError = useSelector((state) => state.patients.errors);

  const { register, errors, handleSubmit } = useForm();

  const passwordModified = useSelector(
    (state) => state.patients.passwordModified
  );
  React.useEffect(() => {
    dispatch(getPatientInfoPatient(localStorage.rut));
  }, [dispatch]);

  const onSubmit = (data) => {
    if (data.newPassword === data.newpass2) {
      data["rut"] = patientInfo.rut;
      delete data.newpass2;
      dispatch(modifyPassword(data));
    } else {
      document.getElementById("pass-error").innerHTML =
        "<p style='color: red;'>Las contraseñas deben ser iguales!</p>";
    }
  };
  console.log(errors);

  const clearError = () => {
    document.getElementById("pass-error").innerHTML = "";
  };

  const reqmsg = "Campo obligatorio";

  const [showForm, setShowForm] = React.useState(false);
  const modifyPass = () => {
    setShowForm(!showForm);
  };

  return (
    <SeePatientStyled>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            {/* <Typography color="textSecondary">adjective</Typography> */}
            {patientInfo && (
              <div style={{ lineHeight: "2" }}>
                <Typography variant="h5">
                  {patientInfo.names} {patientInfo.father_last_name}{" "}
                  {patientInfo.mother_last_name}
                </Typography>
                <hr />
                &bull; <strong>Rut:</strong> {patientInfo.rut} <br />
                &bull; <strong>Ciudad:</strong> {patientInfo.city} <br />
                &bull; <strong>Estado:</strong> {patientInfo.state} <br />
                &bull; <strong>Fecha de ingreso:</strong>{" "}
                {getDate(patientInfo.in_date)} <br />
                &bull; <strong>Email:</strong> {patientInfo.email} <br />
                &bull; <strong>Telefono:</strong> {patientInfo.phone} <br />
                &bull; <strong>Fecha de nacimiento:</strong>{" "}
                {getDate(patientInfo.birth_date)} <br />
                &bull; <strong>Sexo:</strong> {patientInfo.sex} <br />
                &bull; <strong>Tipo de alimentación:</strong>{" "}
                {patientInfo.alimentation} <br />
              </div>
            )}
          </CardContent>
          <CardActions style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Button
              style={{ margin: "auto" }}
              startIcon={<CreateIcon />}
              size="small"
              onClick={() => modifyPass()}
            >
              {showForm ? "Ocultar formulario" : "Modificar contraseña"}
            </Button>
          </CardActions>
        </Card>
      </Container>
      {showForm && (
        <Container maxWidth="sm">
          <br></br>
          <Card>
            <CardContent>
              <form
                autoComplete="off"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="Contraseña antigua"
                      variant="outlined"
                      margin="dense"
                      className="input"
                      fullWidth
                      error={errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      inputRef={register({
                        required: { value: true, message: reqmsg },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="newPassword"
                      type="password"
                      label="Contraseña nueva"
                      variant="outlined"
                      margin="dense"
                      className="input"
                      fullWidth
                      onChange={() => clearError()}
                      error={errors.newPassword}
                      helperText={
                        errors.newPassword ? errors.newPassword.message : ""
                      }
                      inputRef={register({
                        required: { value: true, message: reqmsg },
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="newpass2"
                      type="password"
                      label="Repetir contraseña nueva"
                      variant="outlined"
                      margin="dense"
                      className="input"
                      fullWidth
                      onChange={() => clearError()}
                      error={errors.newpass2}
                      helperText={
                        errors.newpass2 ? errors.newpass2.message : ""
                      }
                      inputRef={register({
                        required: { value: true, message: reqmsg },
                      })}
                    />
                  </Grid>
                  <div id="pass-error">
                    {passwordModified && (
                      <p style={{ color: "green" }}>
                        Contraseña modificada con éxito!
                      </p>
                    )}
                    {passError && <p style={{ color: "red" }}>{passError}</p>}
                  </div>
                </Grid>

                <Grid container alignItems="center">
                  <Button
                    style={{ margin: "10px auto" }}
                    className="form-button"
                    variant="outlined"
                    type="submit"
                    color="primary"
                  >
                    Modificar contraseña
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      )}
    </SeePatientStyled>
  );
}

export default Profile;
