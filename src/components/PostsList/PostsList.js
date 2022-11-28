import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import Button from "../Button/Button";
import {
  FontWeights,
  Shadows,
  PrimaryColor,
  Colors,
} from "../../styles/variables";
import { P } from "../Typography/index";
import { ShowMoreIcon } from "../Icons";
import { PostIconWrapper } from "../Icons/styles";
const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.Medium};
  border-radius: 4px;
  padding: 24px;
`;

const PostsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const PostsListTitle = styled(P)`
  font-weight: ${FontWeights.SuperBold};
`;
const PostLink = styled.a`
  /* NOTE: text and icon align center */
  vertical-align: middle;
  text-decoration: none;
  font-weight: ${FontWeights.Normal};
  font-size: 16px;
  /* NOTE: small trick to avoid hover 1px bounce */
  /* border-bottom: 1px solid ${Colors.White}; */
  :visited {
    color: ${Colors.Black};
  }
  :hover {
    /* border-bottom: 1px solid ${PrimaryColor}; */
    color: ${PrimaryColor};
    svg {
      path {
        stroke: ${PrimaryColor};
      }
    }
  }
`;
const TextContent = styled.span`
  font-size: ${(props) => props.fontSize};
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
export default function PostsList({ width, postListData, isPostListLoading }) {
  const fontSize = width <= 500 ? "16px" : "18px";
  return (
    <PostsListContainer>
      {isPostListLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="100%"
        />
      ) : (
        <>
          <PostsListTitle>往期回顾</PostsListTitle>
          <PostsListWrapper>
            {postListData.map((data, i) => (
              // TODO: href link to another inner page
              <>
                <PostLink href={"http://google.com"} key={i}>
                  <TextContent fontSize={fontSize}>{data}</TextContent>
                  <PostIconWrapper>
                    <ShowMoreIcon />
                  </PostIconWrapper>
                </PostLink>
              </>
            ))}
          </PostsListWrapper>
          <ButtonWrapper>
            <Button label={"更多"} />
          </ButtonWrapper>
        </>
      )}
    </PostsListContainer>
  );
}
PostsList.propTypes = {
  width: PropTypes.number.isRequired,
  postListData: PropTypes.array.isRequired,
  isPostListLoading: PropTypes.bool.isRequired,
};
