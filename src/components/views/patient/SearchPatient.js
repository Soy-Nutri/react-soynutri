import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";

import SearchIcon from "@material-ui/icons/Search";

const SearchPatientStyled = styled.div`
  .paper {
    margin-top: 2em;
    padding: 2px 4px 2px 15px;
    display: flex;
    align-items: center;
    box-shadow: 2px 3px var(--mainPurple);
  }
  .input {
    margin-left: 1em;
    flex: 1;
  }
`;

export default function SearchPatient() {
  return (
    <SearchPatientStyled>
      <Grid containter>
        <Grid item container>
          <Grid item xs={1} sm={4}></Grid>
          <Grid item xs={10} sm={4}>
            <form>
              <Paper component="form" className="paper">
                <SearchIcon />
                <InputBase
                  className="input"
                  placeholder="Buscar pacientes..."
                />
              </Paper>
            </form>
          </Grid>
          <Grid item xs={1} sm={4}></Grid>
        </Grid>
      </Grid>
    </SearchPatientStyled>
  );
}
