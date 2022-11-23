import { css } from "styled-components";
import { FontWeights } from "./variables";

export const H2Styles = css`
  //NOTE: font family should defined at global once
  //GOOGLE: most of the html tags can inherit font family except: (Button, Input)
  font-family: inherit;
  font-weight: ${FontWeights.Bold};
  font-size: 3rem;
  line-height: 150%;
`;
export const H3Styles = css`
  font-family: inherit;
  /* TODO: responsive font size */
  font-size: 36px;
  font-weight: ${FontWeights.Normal};
  line-height: 150%;
`;

export const BodyStyles = css`
  font-family: inherit;
  font-size: 20px;
  font-weight: ${FontWeights.Normal};
  line-height: 25px;
`;
