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
  font-size: ${(props) => props.fontSize};
  font-weight: ${FontWeights.Bold};
  text-align: center;
  margin: 10px;
`;
const VideoEmbed = ({ width, embedId, description, isVideoLoading }) => {
  const fontSize = width <= 500 ? "14px" : "";
  return (
    <>
      <VideoContainer>
        {isVideoLoading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height="100%"
          />
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
      </VideoContainer>
      <TextContainer fontSize={fontSize}>{description}</TextContainer>
    </>
  );
};

VideoEmbed.propTypes = {
  width: PropTypes.number.isRequired,
  embedId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isVideoLoading: PropTypes.bool.isRequired,
};

export default VideoEmbed;
