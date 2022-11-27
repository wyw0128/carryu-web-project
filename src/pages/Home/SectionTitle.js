import { H3 } from "../../components/Typography";
import styled from "styled-components";
import { PrimaryColor } from "../../styles/variables";

export const SectionTitle = styled(H3)`
  display: inline-flex;
  position: relative;
  padding: 8px 16px;
  &::after {
    content: "";
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 12px;
    background-color: ${PrimaryColor};
  }
`;
