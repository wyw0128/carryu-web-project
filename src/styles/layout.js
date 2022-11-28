import styled from "styled-components/macro";

export const GridMax = styled.section`
  display: grid;
  max-width: 1280px;
  margin: 4rem auto 6rem auto;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
  justify-content: center;
  @media screen and (min-width: 250px) and (max-width: 500px) {
    grid-template-columns: 1fr;
    margin: 2rem auto 4rem auto;
  } ;
`;

export const DynamicCol = styled.div`
  /* NOTE: This kind of grid-column is useful when the contents can fill a whole row and do not need to center the content */
  grid-column: ${(props) => `span ${props.ratio}`};
  @media screen and (min-width: 250px) and (max-width: 500px) {
    grid-column: span 1;
    padding: 0 10px;
  }
  // grid-column: ${(props) => `span ${props.ratio} / span ${props.ratio}`};
`;
