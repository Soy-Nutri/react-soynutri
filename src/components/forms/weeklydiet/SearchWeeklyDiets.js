import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import BackButton from "../../../utils/BackButton";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import Skeleton from "@material-ui/lab/Skeleton";

// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

//import Error from "../../Error";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientsList,
  filterPatient,
} from "../../../redux/ducks/patientsDucks";
// import Container from "@material-ui/core/Container";

const SearchPatientStyled = styled.div`
  .paper-input {
    margin-top: 2em;
    padding: 2px 4px 2px 15px;
    display: flex;
    align-items: center;
    &:hover {
      box-shadow: 0 0 2px var(--lightPurple), 0 0 4px var(--lightPurple),
        0 0 6px var(--lightPurple);
    }
  }
  .title {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    font-family: yellowtail;
    font-size: 3.5em;
    /* color: var(--mainPurple); */
  }

  .input {
    margin-left: 1em;
    flex: 1;
  }
  .table {
    margin-top: 1em;
  }
  .paper-table {
    width: 100%;
    /* box-shadow: 2px 3px var(--mainPurple); */
    &:hover {
      box-shadow: 0 0 2px var(--lightPurple), 0 0 4px var(--lightPurple),
        0 0 6px var(--lightPurple);
    }
  }
  .table-container {
    max-height: 440px;
    border-radius: 5px;
  }
  .view-patient {
    cursor: pointer;
  }
  .title {
    font-family: yellowtail;
    text-align: center;
    font-size: 3.5em;
    margin-bottom: 0em;
  }
`;

// Data
const columns = [
  { id: "rut", label: "Rut", minWidth: 100 },
  { id: "names", label: "Nombres", minWidth: 150 },
  { id: "father_last_name", label: "Apellido paterno", minWidth: 100 },
  { id: "mother_last_name", label: "Apellido materno", minWidth: 100 },
  { id: "icon", label: "Acción", minWidth: 50, align: "center" },
];

function createRow(rut, names, father_last_name, mother_last_name) {
  return { rut, names, father_last_name, mother_last_name };
}

export default function SearchPatient({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  //const patients = useSelector((state) => state.patients.patientsData);
  const patients = useSelector((state) => {
    if (state.patients.patientsDataFiltered.length > 0) {
      return state.patients.patientsDataFiltered;
    }
    return state.patients.patientsData;
  });

  //const [rowss, setRowss] = React.useState([]);

  useEffect(() => {
    dispatch(getPatientsList());
    dispatch(filterPatient(""));
  }, [dispatch]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowss = patients.map((patient) => {
    return createRow(
      patient.rut,
      patient.names,
      patient.father_last_name,
      patient.mother_last_name
    );
  });

  const handleClick = (rut) => {
    if (match.params.action === "ver") {
      history.push(`/ver_minuta_semanal/${rut}`);
    } else if (match.params.action === "modificar") {
      history.push(`/modificar_minuta_semanal/${rut}`);
    } else if (match.params.action === "eliminar") {
      history.push(`/eliminar_minuta_semanal/${rut}`);
    } else if (match.params.action === "agregar") {
      history.push(`/agregar_minuta_semanal/${rut}`);
    }
  };

  const handleFilterPatient = (e) => {
    dispatch(filterPatient(e.target.value));
  };
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
  //   defaultMatches: true,
  // });

  return (
    // TODO: ver como mostrar 404 cuando no se cumple esta condicion:
    // match.params.action === "ver" || match.params.action === "modificar" || match.params.action === "eliminar"

    <SearchPatientStyled>
      <Grid container justify="center">
        <Grid item xs={10} sm={6} md={5} lg={4}>
          <Grid item container justify="center">
            <Typography className="title" variant="h5" color="primary">
              Lista de pacientes
            </Typography>
          </Grid>
          <Grid item container justify="center">
            <Typography variant="h6" color="primary">
              {match.params.action === "ver"
                ? "Ver minuta a paciente"
                : match.params.action === "modificar"
                ? "Modificar minuta a paciente"
                : match.params.action === "eliminar"
                ? "Eliminar minuta a paciente"
                : match.params.action === "agregar"
                ? "Agregar minuta a paciente"
                : ""}
            </Typography>
          </Grid>

          <form>
            <Paper className="paper-input">
              <SearchIcon />
              <InputBase
                className="input"
                placeholder="Buscar pacientes..."
                onChange={handleFilterPatient}
              />
            </Paper>
          </form>
        </Grid>
      </Grid>
      <Grid container justify="center" className="table">
        <Grid item xs={false} md={1} lg={3}></Grid>
        <Grid item xs={11} md={9} lg={6}>
          <BackButton his={history} />
        </Grid>
        <Grid item xs={false} md={1} lg={3}></Grid>
      </Grid>

      {rowss.length === 0 ? (
        <Grid container justify="center" className="table">
          <Grid item xs={false} md={1} lg={3}></Grid>
          <Grid item xs={11} md={9} lg={6}>
            <Skeleton
              variant="rect"
              height={300}
              style={{ borderRadius: "5px" }}
            />
          </Grid>
          <Grid item xs={false} md={1} lg={3}></Grid>
        </Grid>
      ) : (
        <React.Fragment>
          {/* TABLE */}
          <Grid container justify="center" className="table">
            <Grid item xs={11} md={9} lg={6}>
              <Paper className="paper-table">
                <TableContainer className="table-container">
                  <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rowss
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.rut}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id === "rut" ? (
                                      <span
                                        style={{
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          width: "150px",
                                          display: "block",
                                        }}
                                      >
                                        {value}
                                      </span>
                                    ) : column.id !== "icon" ? (
                                      value
                                    ) : match.params.action === "ver" ? (
                                      <VisibilityIcon
                                        className="view-patient"
                                        onClick={() => handleClick(row.rut)}
                                      />
                                    ) : match.params.action === "modificar" ? (
                                      <CreateIcon
                                        className="view-patient"
                                        onClick={() => handleClick(row.rut)}
                                      />
                                    ) : match.params.action === "eliminar" ? (
                                      <DeleteIcon
                                        className="view-patient"
                                        onClick={() => handleClick(row.rut)}
                                      />
                                    ) : match.params.action === "agregar" ? (
                                      <AddIcon
                                        className="view-patient"
                                        onClick={() => handleClick(row.rut)}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rowss.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count}`
                  }
                  labelRowsPerPage="Filas por página:"
                  nextIconButtonText="Próxima página"
                />
              </Paper>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </SearchPatientStyled>
  );
}
