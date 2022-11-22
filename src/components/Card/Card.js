import React from "react";
import { Shadows } from "../../styles/variables";
import { P, H3 } from "../Typography/index";
import styled from "styled-components";
import success from "../../assets/icons/success.svg";

const StyledCard = styled.div`
  box-shadow: ${Shadows.Medium};
  border-radius: 4px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.titleBackgroundColor};
`;

const SvgContainer = styled.div`
  margin: 1rem 0 14.73px 1rem;
`;

const CardTitleTextContainer = styled(H3)`
  margin: 0;
  padding: 22px 0 20px 0;
`;

const TextContainer = styled(P)`
  padding: 1rem;
`;

export default function Card(props) {
  return (
    <StyledCard>
      <StyledTitleContainer titleBackgroundColor={props.titleBackgroundColor}>
        <SvgContainer>
          <img src={success} alt="success icon" />
        </SvgContainer>
        <CardTitleTextContainer>{props.title}</CardTitleTextContainer>
      </StyledTitleContainer>
      <TextContainer>{props.content}</TextContainer>
    </StyledCard>
  );
}
