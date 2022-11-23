import React from "react";
import { Shadows, Colors } from "../../styles/variables";
import { P, H3 } from "../Typography/index";
import { IconWrapper } from "../Icons/styles";
import styled from "styled-components";
import { SuccessIcon } from "../Icons";

const StyledCard = styled.article`
  box-shadow: ${Shadows.Medium};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  flex-basis: 25%;
  flex-shrink: 0;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.titleBackgroundColor};
`;

const CardTitleTextContainer = styled(H3)`
  margin: 0;
  //NOTE: try use 4px based number
  padding: 20px 0;
`;

const TextContainer = styled(P)`
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

export default function Card({
  title,
  content,
  titleBackgroundColor = Colors.GreyPrimary,
}) {
  return (
    <StyledCard>
      <StyledTitleContainer titleBackgroundColor={titleBackgroundColor}>
        <IconWrapper>
          {/* NOTE: third party icon will not support this */}
          {/* <img src={AcUnitIcon} alt="success icon" width={"80%"} /> */}
          <SuccessIcon />
        </IconWrapper>
        <CardTitleTextContainer>{title}</CardTitleTextContainer>
      </StyledTitleContainer>
      <TextContainer>{content}</TextContainer>
    </StyledCard>
  );
}
