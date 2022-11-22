import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  /* NOTE: */
  object-fit: cover;
  flex-shrink: 0;
`;

export default function Slider(props) {
  const { src, alt } = props;
  return <StyledImg src={src} alt={alt} />;
}

Slider.propTypes = {
  src: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
};
