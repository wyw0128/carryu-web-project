// import styled from "styled-components";
import styled from "styled-components/macro";

export const CarouselWrapper = styled.section`
  width: 100%;
  /* NOTE: height based on width */
  height: ${(props) => `${props.carouselHeight}px`};
  position: relative;
  overflow: hidden;
`;

export const SlidersWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  transition: 1s;
`;
