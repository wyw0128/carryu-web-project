import styled from "styled-components/macro";

//NOTE: naming here usually some big container we use name container, some small ones we use wrapper is fine

export const IconWrapper = styled.span`
  margin: 1rem 0 12px 1rem;
  // can use props to pass width or height
  width: 66px;
  height: 66px;
  /* NOTE:  */
  > svg {
    width: 100%;
    height: 100%;
  }
`;
