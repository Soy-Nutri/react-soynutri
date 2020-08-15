import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Skeleton from "@material-ui/lab/Skeleton";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getPatientsList } from "../../../redux/ducks/patientsDucks";
import Container from "@material-ui/core/Container";

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
  .input {
    margin-left: 1em;
    flex: 1;
  }
  .table {
    margin-top: 3em;
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
`;

// Data
const columns = [
  { id: "rut", label: "Rut", minWidth: 100 },
  { id: "names", label: "Nombres", minWidth: 150 },
  { id: "father_last_name", label: "Apellido paterno", minWidth: 100 },
  { id: "mother_last_name", label: "Apellido materno", minWidth: 100 },
  { id: "see_icon", label: "Ver detalles", minWidth: 50, align: "center" },
];

function createRow(rut, names, father_last_name, mother_last_name) {
  return { rut, names, father_last_name, mother_last_name };
}

export default function SearchPatient() {
  const dispatch = useDispatch();
  const history = useHistory();
  const patients = useSelector((state) => state.patients.patientsData);

  //const [rowss, setRowss] = React.useState([]);

  useEffect(() => {
    dispatch(getPatientsList());
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
    history.push(`/buscar_control/${rut}`);
  };
  return (
    <SearchPatientStyled>
      <Grid container justify="center">
        <Grid item xs={10} sm={6} md={5} lg={4}>
          <h2></h2>
          <form>
            <Paper className="paper-input">
              <SearchIcon />
              <InputBase className="input" placeholder="Buscar pacientes..." />
            </Paper>
          </form>
        </Grid>
      </Grid>

      {rowss.length === 0 ? (
        <Container maxWidth="md" style={{ marginTop: "50px" }}>
          <Skeleton
            variant="rect"
            height={300}
            style={{ borderRadius: "5px" }}
          />
        </Container>
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
                                    ) : column.id !== "see_icon" ? (
                                      value
                                    ) : (
                                      <VisibilityIcon
                                        className="view-patient"
                                        onClick={() => handleClick(row.rut)}
                                      />
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
