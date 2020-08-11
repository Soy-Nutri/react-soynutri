import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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

//redux
import { deletePatient } from "../../../redux/ducks/patientsDucks";
import { useDispatch } from "react-redux";

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

export default function SeePatient() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyClick = (rut) => {
    console.log(history.location);
    history.push(`/modificar_paciente/${rut}`);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    dispatch(deletePatient({ rut: "19473994" }));
    handleClose();
  };

  return (
    <SeePatientStyled>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h5">
              Nicolas Patricio Navarrete Maldonado
            </Typography>
            <hr />
            {/* <Typography color="textSecondary">adjective</Typography> */}
            <Typography style={{ lineHeight: "2" }}>
              &bull; <strong>Rut:</strong> 19.697.438-5 <br />
              &bull; <strong>Ciudad:</strong> Talca <br />
              &bull; <strong>Estado:</strong> activo <br />
              &bull; <strong>Fecha de ingreso:</strong> 19/02/2021 <br />
              &bull; <strong>Email:</strong> email@email.com <br />
              &bull; <strong>Telefono:</strong> 345645654 <br />
              &bull; <strong>Fecha de nacimiento:</strong> 19/02/2021 <br />
              &bull; <strong>Sexo:</strong> masculino <br />
              &bull; <strong>Tipo de alimentación:</strong> omnivoro <br />
            </Typography>
          </CardContent>
          <CardActions style={{ marginLeft: "5px", marginRight: "5px" }}>
            <Button startIcon={<VisibilityIcon />} size="small">
              Documentos nutricionales
            </Button>
            <Tooltip title="Modificar paciente" placement="top">
              <Button
                style={{ marginLeft: "auto" }}
                size="small"
                onClick={() => handleModifyClick("111")}
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
            Nicolas Patricio Navarrete Maldonado será eliminado permanentemente
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
    </SeePatientStyled>
  );
}
