import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import AssignmentIcon from "@material-ui/icons/Assignment";

const ControlMenuStyled = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  .button-menu {
    color: white;
  }
  .menu-item:hover {
    background-color: var(--lightPurple);
    color: white;
  }
  .icon {
    margin-right: 0.2em;
  }
`;

export default function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <ControlMenuStyled>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="text"
        className="button-menu"
      >
        <AssignmentIcon fontSize="inherit" className="icon" />
        Controles
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className="paper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_control/agregar"
                  >
                    Agregar control
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_control/ver"
                  >
                    Ver control
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_control/modificar"
                  >
                    Modificar control
                  </MenuItem>
                  <MenuItem
                    className="menu-item"
                    onClick={handleClose}
                    component={Link}
                    to="/buscar_control/eliminar"
                  >
                    Eliminar control
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ControlMenuStyled>
  );
}
