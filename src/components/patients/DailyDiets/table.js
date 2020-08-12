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

export default function SimpleTable({ carnet }) {
  const classes = useStyles();

  let header = [];
  header.push("name");
  for (let i = 0; i < carnet.length; i++) {
    header.push(carnet[i].date);
  }
  let abdominal_fold = { name: "P. abdominal" };
  let biological_age = { name: "Edad Biológica" };
  let cad_max = { name: "C cad. Máxima" };
  let cbc = { name: "CBC" };
  let cbr = { name: "CBR" };
  let cc_max = { name: "CC Máxima" };
  let cc_min = { name: "CC Mínima" };
  let dni = { name: "Dni" };
  let fat = { name: "% grasa" };
  let imc = { name: "IMC (Kg/Mt^2)" };
  let mass = { name: "% masa" };
  let muscle_mass = { name: "M. muscular (Kg)" };
  let size = { name: "Talla" };
  let subscapular_fold = { name: "P. subescapular" };
  let triceps_fold = { name: "P. tricipital" };
  let visceral_fat = { name: "Grasa visceral" };
  let weight = { name: "Peso" };
  for (let i = 1; i < header.length; i++) {
    abdominal_fold[header[i]] = carnet[i - 1].abdominal_fold;
    biological_age[header[i]] = carnet[i - 1].biological_age;
    cad_max[header[i]] = carnet[i - 1].cad_max;
    cbc[header[i]] = carnet[i - 1].cbc;
    cbr[header[i]] = carnet[i - 1].cbr;
    cc_max[header[i]] = carnet[i - 1].cc_max;
    cc_min[header[i]] = carnet[i - 1].cc_min;
    dni[header[i]] = carnet[i - 1].dni;
    fat[header[i]] = carnet[i - 1].fat;
    imc[header[i]] = carnet[i - 1].imc;
    mass[header[i]] = carnet[i - 1].mass;
    muscle_mass[header[i]] = carnet[i - 1].muscle_mass;
    size[header[i]] = carnet[i - 1].size;
    subscapular_fold[header[i]] = carnet[i - 1].subscapular_fold;
    triceps_fold[header[i]] = carnet[i - 1].triceps_fold;
    visceral_fat[header[i]] = carnet[i - 1].visceral_fat;
    weight[header[i]] = carnet[i - 1].weight;
  }
  let rows = [
    weight,
    size,
    cbr,
    cbc,
    cc_min,
    cc_max,
    cad_max,
    triceps_fold,
    subscapular_fold,
    abdominal_fold,
    imc,
    dni,
    biological_age,
    visceral_fat,
    fat,
    mass,
    muscle_mass,
  ];

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
