import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { PrimaryColor } from "../../styles/variables";
export default function Footer({ isFooterLoading, footerData }) {
  const FooterContainer = styled.section`
    font-size: 16px;
    font-family: inherit;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  `;
  const FooterWrapper = styled.div`
    display: flex;
    gap: 8px;
  `;
  const Link = styled.a`
    text-decoration: none;
    :hover {
      color: ${PrimaryColor};
    }
  `;
  return (
    !isFooterLoading && (
      <FooterContainer>
        <p>@2022 CarryU留学移民教育 All Rights Reserved</p>
        <FooterWrapper>
          <span>友情链接:</span>
          {footerData.map((data, i) => (
            <Link key={i} href={data.Url} target={"_blank"}>
              {data.text}
            </Link>
          ))}
        </FooterWrapper>
      </FooterContainer>
    )
  );
}
Footer.propTypes = {
  isFooterLoading: PropTypes.bool.isRequired,
  footerData: PropTypes.array.isRequired,
};
