import React from "react";
import styled from "styled-components/macro";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { P } from "../Typography/index";
import { FontWeights } from "../../styles/variables";
const VideoWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(P)`
  font-weight: ${FontWeights.Bold};
`;
const VideoEmbed = ({ embedId, description, isVideoLoading }) => (
  <VideoWrapper>
    {isVideoLoading ? (
      <Skeleton variant="rounded" animation="wave" width="100%" height="100%" />
    ) : (
      <iframe
        // TODO: width & height ratio
        width="1064px"
        height="523.7px"
        src={`https://www.ixigua.com/iframe/${embedId}?autoplay=0`}
        referrerPolicy="unsafe-url"
        frameBorder="0"
        allowFullScreen
        title={description}
      />
    )}
    <TextContainer>{description}</TextContainer>
  </VideoWrapper>
);

VideoEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default VideoEmbed;
