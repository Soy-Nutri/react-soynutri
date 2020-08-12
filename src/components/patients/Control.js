import React from "react";
import styled from "styled-components";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getControl } from "../../redux/ducks/carnet";

const ControlsStyled = styled.div``;

export default function Controls() {
  const dispatch = useDispatch();
  const carnet = useSelector((state) => state.carnet.control);

  React.useEffect(() => {
    const getCarnet = () => {
      dispatch(getControl(localStorage.rut));
    };
    getCarnet();
  }, [dispatch]);

  console.log(carnet);

  return <ControlsStyled>Control</ControlsStyled>;
}
