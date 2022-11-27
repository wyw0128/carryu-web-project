import styled from "styled-components/macro";

export const GridMax = styled.section`
  display: grid;
  max-width: 1280px;
  margin: 8rem auto;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  justify-content: center;
`;

export const DynamicCol = styled.div`
  /* NOTE: This kind of grid-column is useful when the contents can fill a whole row and do not need to center the content */
  grid-column: ${(props) => `span ${props.ratio}`};
  // grid-column: ${(props) => `span ${props.ratio} / span ${props.ratio}`};
`;
