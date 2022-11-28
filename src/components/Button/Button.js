import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Colors } from "../../styles/variables";
const Button = styled.button`
  padding: 0.5rem;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px;
  cursor: pointer;
`;

export const ButtonCom = ({ color, label, backgroundColor = Colors.White }) => (
  <Button color={color} backgroundColor={backgroundColor}>
    {label}
  </Button>
);

export default ButtonCom;
Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
};
