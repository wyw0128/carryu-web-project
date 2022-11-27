import React from "react";
import styled from "styled-components/macro";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { P } from "../Typography/index";
import { FontWeights } from "../../styles/variables";
const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;
`;
const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const TextContainer = styled(P)`
  font-weight: ${FontWeights.Bold};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -3rem;
`;
const VideoEmbed = ({ embedId, description, isVideoLoading }) => (
  <VideoContainer>
    {isVideoLoading ? (
      <Skeleton variant="rounded" animation="wave" width="100%" height="100%" />
    ) : (
      <VideoWrapper>
        <iframe
          // TODO: width & height ratio
          width="100%"
          height="100%"
          src={`https://www.ixigua.com/iframe/${embedId}?autoplay=0`}
          referrerPolicy="unsafe-url"
          frameBorder="0"
          allowFullScreen
          title={description}
        />
      </VideoWrapper>
    )}
    <TextContainer>{description}</TextContainer>
  </VideoContainer>
);

VideoEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default VideoEmbed;
