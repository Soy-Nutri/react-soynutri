import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({ weekly }) {
  var rows = [];
  var header = [];
  const createData = (day, breakfast, lunch, snack, post_training, dinner) => {
    rows.push({ day, breakfast, lunch, snack, post_training, dinner });
  };
  const classes = useStyles();

  if ("lunes" in weekly) {
    header.push({
      timeBreakfast: weekly["lunes"].timeBreakfast,
      timeLunch: weekly["lunes"].timeLunch,
      timeSnack: weekly["lunes"].timeSnack,
      timeDinner: weekly["lunes"].timeDinner,
    });
    createData(
      "lunes",
      weekly["lunes"].breakfast,
      weekly["lunes"].lunch,
      weekly["lunes"].snack,
      weekly["lunes"].post_training,
      weekly["lunes"].dinner
    );
  }
  if ("martes" in weekly) {
    header.push({
      timeBreakfast: weekly["martes"].timeBreakfast,
      timeLunch: weekly["martes"].timeLunch,
      timeSnack: weekly["martes"].timeSnack,
      timeDinner: weekly["martes"].timeDinner,
    });
    createData(
      "martes",
      weekly["martes"].breakfast,
      weekly["martes"].lunch,
      weekly["martes"].snack,
      weekly["martes"].post_training,
      weekly["martes"].dinner
    );
  }
  if ("miercoles" in weekly) {
    header.push({
      timeBreakfast: weekly["miercoles"].timeBreakfast,
      timeLunch: weekly["miercoles"].timeLunch,
      timeSnack: weekly["miercoles"].timeSnack,
      timeDinner: weekly["miercoles"].timeDinner,
    });
    createData(
      "miercoles",
      weekly["miercoles"].breakfast,
      weekly["miercoles"].lunch,
      weekly["miercoles"].snack,
      weekly["miercoles"].post_training,
      weekly["miercoles"].dinner
    );
  }
  if ("jueves" in weekly) {
    header.push({
      timeBreakfast: weekly["jueves"].timeBreakfast,
      timeLunch: weekly["jueves"].timeLunch,
      timeSnack: weekly["jueves"].timeSnack,
      timeDinner: weekly["jueves"].timeDinner,
    });
    createData(
      "jueves",
      weekly["jueves"].breakfast,
      weekly["jueves"].lunch,
      weekly["jueves"].snack,
      weekly["jueves"].post_training,
      weekly["jueves"].dinner
    );
  }
  if ("viernes" in weekly) {
    header.push({
      timeBreakfast: weekly["viernes"].timeBreakfast,
      timeLunch: weekly["viernes"].timeLunch,
      timeSnack: weekly["viernes"].timeSnack,
      timeDinner: weekly["viernes"].timeDinner,
    });
    createData(
      "viernes",
      weekly["viernes"].breakfast,
      weekly["viernes"].lunch,
      weekly["viernes"].snack,
      weekly["viernes"].post_training,
      weekly["viernes"].dinner
    );
  }
  if ("sabado" in weekly) {
    header.push({
      timeBreakfast: weekly["sabado"].timeBreakfast,
      timeLunch: weekly["sabado"].timeLunch,
      timeSnack: weekly["sabado"].timeSnack,
      timeDinner: weekly["sabado"].timeDinner,
    });
    createData(
      "sabado",
      weekly["sabado"].breakfast,
      weekly["sabado"].lunch,
      weekly["sabado"].snack,
      weekly["sabado"].post_training,
      weekly["sabado"].dinner
    );
  }
  if ("domingo" in weekly) {
    header.push({
      timeBreakfast: weekly["domingo"].timeBreakfast,
      timeLunch: weekly["domingo"].timeLunch,
      timeSnack: weekly["domingo"].timeSnack,
      timeDinner: weekly["domingo"].timeDinner,
    });
    createData(
      "domingo",
      weekly["domingo"].breakfast,
      weekly["domingo"].lunch,
      weekly["domingo"].snack,
      weekly["domingo"].post_training,
      weekly["domingo"].dinner
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Día</TableCell>

            <TableCell align="left">
              Desayuno {header[0].timeBreakfast}
            </TableCell>
            <TableCell align="left">Almuerzo {header[0].timeLunch}</TableCell>
            <TableCell align="left">Colación {header[0].timeSnack}</TableCell>
            <TableCell align="left">Post entreno</TableCell>
            <TableCell align="left">Cena {header[0].timeDinner}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={Math.random()}>
              <TableCell component="th" scope="row">
                {row.day}
              </TableCell>
              <TableCell align="left">{row.breakfast}</TableCell>
              <TableCell align="left">{row.lunch}</TableCell>
              <TableCell align="left">{row.snack}</TableCell>
              <TableCell align="left">{row.post_training}</TableCell>
              <TableCell align="left">{row.dinner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
