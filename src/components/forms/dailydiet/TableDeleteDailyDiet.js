import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import { deleteDailyDiets } from "../../../redux/ducks/patientsDailyDietsDuck";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Skeleton from "@material-ui/lab/Skeleton";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const columns = [
  { id: "date", label: "Fecha", minWidth: 170 },
  { id: "action", label: "Eliminar", minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function getFecha(date) {
  let newDate = new Date(date);
  let month = (newDate.getMonth() + 1).toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${year}/${monthS}/${dayS}`;
}

export default function StickyHeadTable({ rut, rowsShow }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(rowsShow);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const dispatch = useDispatch();
  const dailyDietErrors = useSelector((state) => state.dailyDiets.deleteErrors);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteDailyDietDate = (date, dateF) => {
    setDates({ date, dateF });
    setOpen(true);
  };

  const [dates, setDates] = React.useState({
    date: "",
    dateF: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setDates({
      date: "",
      dateF: "",
    });
    setOpen(false);
  };

  const handleDelete = () => {
    let dateF = dates.dateF;
    let date = dates.date;
    setOpenSnackbar(true);
    dispatch(deleteDailyDiets(rut, getFecha(dateF)));
    let auxRows = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].date !== date) {
        auxRows.push(rows[i]);
      }
    }
    setRows(auxRows);

    handleClose();
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "date" ? (
                            value
                          ) : column.id === "action" ? (
                            <DeleteIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                deleteDailyDietDate(row.date, row.dateF)
                              }
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
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {dailyDietErrors ? (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            Error inesperado, intente nuevamente más tarde.
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Pauta diaria eliminada con éxito.
          </Alert>
        </Snackbar>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Realmente desea eliminar esta pauta diaria?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dates.date ? (
              `La pauta diaria con fecha ${dates.date} será eliminada.`
            ) : (
              <Skeleton variant="text" style={{ borderRadius: "5px" }} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
