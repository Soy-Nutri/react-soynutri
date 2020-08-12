import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  fixedColumn: {
    position: "sticky",
    left: 0,
    backgroundColor: theme.palette.type === "dark" ? "#393939" : "#EEEDED",
  },
}));

function getFecha(date) {
  let newDate = new Date(date);
  let month = newDate.getMonth().toString();
  let day = (newDate.getDate() + 1).toString();
  let year = newDate.getFullYear().toString();
  let dayS = day.length > 1 ? day : `0${day}`;
  let monthS = month.length > 1 ? month : `0${month}`;
  return `${dayS}/${monthS}/${year}`;
}

export default function SimpleTable({ biochemical }) {
  const classes = useStyles();

  let header = [];
  header.push("name");
  for (let i = 0; i < biochemical.length; i++) {
    header.push(biochemical[i].date);
  }

  let size = { name: "Talla" };
  let weight = { name: "Peso" };
  for (let i = 1; i < header.length; i++) {
    size[header[i]] = biochemical[i - 1].b12;
    weight[header[i]] = biochemical[i - 1].d;
  }
  let rows = [weight, size];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <React.Fragment key={item}>
                {item === "name" ? (
                  <TableCell className={classes.fixedColumn}>
                    <strong>{"Fecha"}</strong>
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <strong>{getFecha(item)}</strong>
                  </TableCell>
                )}
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {header.map((item) => (
                <React.Fragment key={item}>
                  {item === "name" ? (
                    <TableCell className={classes.fixedColumn}>
                      {row[item]}
                    </TableCell>
                  ) : (
                    <TableCell align="center">{row[item]}</TableCell>
                  )}
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
