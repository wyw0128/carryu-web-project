import React from "react";
import styled from "styled-components/macro";
import Button from "../Button/Button";
import { FontWeights, Shadows, Colors } from "../../styles/variables";
import { P } from "../Typography/index";
import { ShowMoreIcon } from "../Icons";
import { PostIconWrapper } from "../Icons/styles";
const PostsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
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
  font-weight: ${FontWeights.Bold};
  font-size: 16px;
  :visited {
    color: black;
  }
  :hover {
    /* border-bottom: 1px solid ${Colors.YellowPrimary}; */
    color: ${Colors.YellowPrimary};
    svg {
      path {
        stroke: ${Colors.YellowPrimary};
      }
    }
  }
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
`;
export default function PostsList({ postListData }) {
  return (
    <PostsListContainer>
      <PostsListTitle>往期回顾</PostsListTitle>
      <PostsListWrapper>
        {postListData.map((data, i) => (
          // TODO: href link to another inner page
          <>
            <PostLink href={"http://google.com"} key={i}>
              <span>{data}</span>
              <PostIconWrapper>
                <ShowMoreIcon />
              </PostIconWrapper>
            </PostLink>
          </>
        ))}
      </PostsListWrapper>
      <ButtonWrapper>
        <Button label={"更多"} backgroundColor={"#fff"} />
      </ButtonWrapper>
    </PostsListContainer>
  );
}
