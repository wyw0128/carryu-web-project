import React, { useState, useEffect } from "react";
import { urlFor } from "../../utils/sanity-utils";
import { H3 } from "../../components/Typography";
import { GridMax, Col12, DynamicCol } from "../../styles/layout";
import Carousel from "../../components/Carousel/Carousel";
import CardsList from "../../components/CardsList/CardsList";
import VideoEmbed from "../../components/Video/VideoEmbed";
import PostsList from "../../components/PostsList/PostsList";
import { SectionTitle } from "../Home/SectionTitle";
import styled from "styled-components";

const sanityClient = require("@sanity/client");

const StyledSectionTitle = styled(SectionTitle)`
  /* NOTE: Using this kind grid-column can help set up justify content center */
  grid-column: 6 / 8;
  margin-bottom: 4rem;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  grid-column: 3 / 11;
`;

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
export default function Home() {
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  const [isSamplesLoading, setIsSamplesLoading] = useState(true);
  const [isEduVideoLoading, setIsEduVideoLoading] = useState(true);
  const [isImmVideoLoading, setIsImmVideoLoading] = useState(true);
  const [isPostListLoading, setIsPostListLoading] = useState(true);
  const [sliderImageSrcs, setImageSrcs] = useState([]);
  const [sliderAlts, setSliderAlts] = useState([]);
  const [samplesData, setSamplesData] = useState([]);
  const [eduVideoData, setEduVideoData] = useState({});
  const [immVideoData, setImmVideoData] = useState({});
  const [postListData, setPostListData] = useState([]);
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
    } catch (err) {
      console.error(err);
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
  const isEduVideo = !isEduVideoLoading && eduVideoData.type === "education";
  const isImmVideo = !isImmVideoLoading && immVideoData.type === "immigration";
  // const EduVideoSection = styled.section`
  //   width: 80%;
  //   margin: 8rem auto;
  // `;
  // const ImmVideoSection = styled.section`
  //   width: 100%;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: flex-start;
  // `;
  return (
    <>
      <Carousel
        sliderImageSrcs={sliderImageSrcs}
        sliderAlts={sliderAlts}
        isLoading={isCarouselLoading}
      />
      <GridMax>
        <StyledSectionTitle>留学专区</StyledSectionTitle>
        <VideoWrapper>
          {isEduVideo && (
            <VideoEmbed
              isVideoLoading={isEduVideoLoading}
              embedId={eduVideoData.id}
              description={eduVideoData.description}
            />
          )}
        </VideoWrapper>
      </GridMax>

      {!isSamplesLoading && <CardsList sampleListData={samplesData} />}
      {/* <ImmVideoSection> */}
      <GridMax>
        <StyledSectionTitle>移民专区</StyledSectionTitle>
        <DynamicCol ratio={6}>
          {isImmVideo && (
            <VideoEmbed
              isVideoLoading={isImmVideoLoading}
              embedId={immVideoData.id}
              description={immVideoData.description}
            />
          )}
        </DynamicCol>
        <DynamicCol ratio={6}>
          <PostsList postListData={postListData} />
        </DynamicCol>
      </GridMax>

      {/* </ImmVideoSection> */}
    </>
  );
}
