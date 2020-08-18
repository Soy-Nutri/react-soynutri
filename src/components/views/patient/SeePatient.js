import React from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import BackButton from "../../../utils/BackButton";

//redux
import {
  getPatientInfo,
  deletePatient,
} from "../../../redux/ducks/patientsDucks";
import { useDispatch, useSelector } from "react-redux";
import { getId } from "../../../redux/ducks/patientsDucks";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SeePatient({ match, history }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const patientInfo = useSelector((state) => state.patients.patientInfo);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDocClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDocClose = (selected) => {
    setAnchorEl(null);
    if (selected === "control") {
      history.push(`/ver_control/${match.params.rut}`);
    } else if (selected === "daily_diet") {
      history.push(`/ver_pauta_diaria/${match.params.rut}`);
    } else if (selected === "weekly_diet") {
      history.push(`/ver_minuta_semanal/${match.params.rut}`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSnack = () => {
    setOpenSnack(true);
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  React.useEffect(() => {
    dispatch(getPatientInfo(match.params.rut));
    dispatch(getId(match.params.rut));
  }, [dispatch, match.params.rut]);
  const exists = useSelector((state) => state.patients.exists);
  if (exists === "error") {
    window.location.href = "/error";
  }

  if (match.params.elim !== "v") {
    window.location.href = "/error";
  }

  const handleModifyClick = (rut) => {
    history.push(`/modificar_paciente/${rut}`);
  };

  const handleDelete = () => {
    dispatch(deletePatient({ rut: match.params.rut }));
    handleClose();
    handleOpenSnack();
  };

  return (
    <SeePatientStyled>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          color="primary"
          style={{
            fontFamily: "yellowtail",
            marginBottom: "1em",
            textAlign: "center",
          }}
        >
          Perfil de paciente
        </Typography>
        <BackButton his={history} />
        {patientInfo ? (
          <Card style={{ marginTop: "1em" }}>
            <CardContent>
              {/* <Typography color="textSecondary">adjective</Typography> */}
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
            </CardContent>
            <CardActions style={{ marginLeft: "5px", marginRight: "5px" }}>
              <Button
                startIcon={<VisibilityIcon />}
                size="small"
                onClick={handleDocClick}
              >
                Documentos nutricionales
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleDocClose}
              >
                <MenuItem onClick={() => handleDocClose("control")}>
                  Controles
                </MenuItem>
                <MenuItem onClick={() => handleDocClose("daily_diet")}>
                  Pautas Diarias
                </MenuItem>
                <MenuItem onClick={() => handleDocClose("weekly_diet")}>
                  Minutas Semanales
                </MenuItem>
              </Menu>

              <Tooltip title="Modificar paciente" placement="top">
                <Button
                  style={{ marginLeft: "auto" }}
                  size="small"
                  onClick={() => handleModifyClick(match.params.rut)}
                >
                  <CreateIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Eliminar paciente" placement="top">
                <Button size="small" onClick={() => handleOpen()}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        ) : (
          <Skeleton
            variant="rect"
            height={380}
            style={{ borderRadius: "5px", marginTop: "1em" }}
          />
        )}
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Realmente desea eliminar a este paciente?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {patientInfo ? (
              `${patientInfo.names} ${patientInfo.father_last_name} ${patientInfo.mother_last_name} será eliminado`
            ) : (
              <Skeleton variant="text" style={{ borderRadius: "5px" }} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          El paciente fue eliminado exitosamente!
        </Alert>
      </Snackbar>
    </SeePatientStyled>
  );
}
