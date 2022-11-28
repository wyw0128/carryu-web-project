import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { urlFor } from "../../utils/sanity-utils";
import { GridMax, DynamicCol } from "../../styles/layout";
import { useReizeObserver } from "../../hooks/useResizeObserver";
import Carousel from "../../components/Carousel/Carousel";
import CardsList from "../../components/CardsList/CardsList";
import VideoEmbed from "../../components/Video/VideoEmbed";
import PostsList from "../../components/PostsList/PostsList";
import Footer from "../../components/Footer/Footer";
import { SectionTitle } from "../Home/SectionTitle";

const sanityClient = require("@sanity/client");

const CarouselContainer = styled.section``;
const CardsListWrapper = styled.section``;
const StyledSectionTitle = styled(SectionTitle)`
  /* NOTE: Using this kind grid-column can help set up justify content center */
  grid-column: 6 / 8;
  margin-bottom: 4rem;
  justify-content: center;
  @media screen and (min-width: 250px) and (max-width: 500px) {
    grid-column: span 1;
    font-size: 32px;
    line-height: 48px;
  }
`;
const VideoWrapper = styled.div`
  grid-column: 3 / 11;
  @media screen and (min-width: 250px) and (max-width: 500px) {
    grid-column: span 1;
    padding: 0 10px;
  }
`;
const PostsListContainer = styled.div``;

const client = sanityClient({
  projectId: "s5jcdx1h",
  dataset: "production",
  apiVersion: "2022-11-18", // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});

const carouselQuery = '*[_type == "Sliders"] | order(_updatedAt desc) {image}';
const sampleQuery =
  '*[_type == "SuccessfulSample"] | order(_updatedAt desc) {postName,postText,type,visaImage}';
const eduVideoQuery =
  '*[_type == "videos" && type == "education"] | order(_updatedAt desc) [0] {id,description,type}';
const immVideoQuery =
  '*[_type == "videos" && type == "immigration"] | order(_updatedAt desc) [0] {id,description,type}';
const postsQuery = '*[_type == "posts" ] | order(_updatedAt desc) {title}';
const footerQuery =
  '*[_type == "footer"] | order(_updatedAt desc){text,"Url":externalUrl.externalUrl}';
export default function Home() {
  // TODO: make tidy & add promise
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  const [isSamplesLoading, setIsSamplesLoading] = useState(true);
  const [isEduVideoLoading, setIsEduVideoLoading] = useState(true);
  const [isImmVideoLoading, setIsImmVideoLoading] = useState(true);
  const [isPostListLoading, setIsPostListLoading] = useState(true);
  const [isFooterLoading, setIsFooterLoading] = useState(true);
  const [sliderImageSrcs, setImageSrcs] = useState([]);
  const [sliderAlts, setSliderAlts] = useState([]);
  const [samplesData, setSamplesData] = useState([]);
  const [eduVideoData, setEduVideoData] = useState({});
  const [immVideoData, setImmVideoData] = useState({});
  const [postListData, setPostListData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const { width, measuredRef } = useReizeObserver();
  useEffect(() => {
    try {
      client.fetch(carouselQuery, {}).then((sliders) => {
        // if (!sliders.ok == true) throw new Error("Problem with loading sliders.");
        setIsCarouselLoading(false);
        setImageSrcs(sliders.map((slider) => urlFor(slider.image.image.asset)));
        setSliderAlts(sliders.map((slider) => slider.image.alt));
      });
      client.fetch(sampleQuery, {}).then((result) => {
        setIsSamplesLoading(false);
        setSamplesData(result.map((data) => data));
      });
      client.fetch(eduVideoQuery, {}).then((result) => {
        setIsEduVideoLoading(false);
        setEduVideoData(result);
      });
      client.fetch(immVideoQuery, {}).then((result) => {
        setIsImmVideoLoading(false);
        setImmVideoData(result);
      });
      client.fetch(postsQuery, {}).then((result) => {
        setIsPostListLoading(false);
        setPostListData(result.map((data) => data.title));
      });
      client.fetch(footerQuery, {}).then((result) => {
        setIsFooterLoading(false);
        setFooterData(result.map((data) => data));
      });
    } catch (err) {
      console.error("There is something wrong with the data:", err);
    }
    return () => {
      setIsCarouselLoading(true);
      setIsSamplesLoading(true);
      setIsEduVideoLoading(true);
      setIsImmVideoLoading(true);
      setImageSrcs([]);
      setSliderAlts([]);
      setSamplesData([]);
      setEduVideoData({});
      setImmVideoData({});
    };
  }, []);
  const isEduVideo = eduVideoData.type === "education";
  const isImmVideo = immVideoData.type === "immigration";
  return (
    <>
      <CarouselContainer ref={measuredRef}>
        <Carousel
          width={width}
          sliderImageSrcs={sliderImageSrcs}
          sliderAlts={sliderAlts}
          isLoading={isCarouselLoading}
        />
      </CarouselContainer>
      <GridMax>
        <StyledSectionTitle>留学专区</StyledSectionTitle>
        <VideoWrapper ref={measuredRef}>
          {isEduVideo && (
            <VideoEmbed
              width={width}
              isVideoLoading={isEduVideoLoading}
              embedId={eduVideoData.id}
              description={eduVideoData.description}
            />
          )}
        </VideoWrapper>
      </GridMax>
      <CardsListWrapper ref={measuredRef}>
        <CardsList
          width={width}
          sampleListData={samplesData}
          isSamplesLoading={isSamplesLoading}
        />
      </CardsListWrapper>
      <GridMax>
        <StyledSectionTitle>移民专区</StyledSectionTitle>
        <DynamicCol ratio={6}>
          {isImmVideo && (
            <VideoWrapper ref={measuredRef}>
              <VideoEmbed
                width={width}
                isVideoLoading={isImmVideoLoading}
                embedId={immVideoData.id}
                description={immVideoData.description}
              />
            </VideoWrapper>
          )}
        </DynamicCol>
        <DynamicCol ratio={6}>
          <PostsListContainer ref={measuredRef}>
            <PostsList
              width={width}
              postListData={postListData}
              isPostListLoading={isPostListLoading}
            />
          </PostsListContainer>
        </DynamicCol>
      </GridMax>
      <Footer
        isFooterLoading={isFooterLoading}
        footerData={footerData}
      ></Footer>
    </>
  );
}
