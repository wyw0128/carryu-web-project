import React from "react";
import styled from "styled-components/macro";

const Button = styled.button`
  padding: 0.5rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
`;

export const ButtonCom = (props) => (
  <Button
    color={props.color}
    backgroundColor={props.backgroundColor}
    // borderRadius={props.borderRadius}
  >
    {props.label}
  </Button>
);

export default ButtonCom;
