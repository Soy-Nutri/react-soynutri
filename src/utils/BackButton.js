import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export default function BackButton({ his }) {
  return (
    <Tooltip title="Atrás" placement="top">
      <Button
        variant="outlined"
        style={{ marginBottom: "10px" }}
        onClick={() => his.goBack()}
      >
        <KeyboardBackspaceIcon />
      </Button>
    </Tooltip>
  );
}
