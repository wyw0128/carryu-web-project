import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardsList from "../../components/CardsList/CardsList";
import VideoEmbed from "../../components/Video/VideoEmbed";
import { urlFor } from "../../utils/sanity-utils";
const sanityClient = require("@sanity/client");

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
export default function Home() {
  const [sliderImageSrcs, setImageSrcs] = useState([]);
  const [sliderAlts, setSliderAlts] = useState([]);
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  const [isSamplesLoading, setIsSamplesLoading] = useState(true);
  const [isEduVideoLoading, setIsEduVideoLoading] = useState(true);
  const [isImmVideoLoading, setIsImmVideoLoading] = useState(true);
  const [samplesData, setSamplesData] = useState([]);
  const [eduVideoData, setEduVideoData] = useState({});
  const [immVideoData, setImmVideoData] = useState({});
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
  console.log(immVideoData);
  return (
    <>
      <Carousel
        sliderImageSrcs={sliderImageSrcs}
        sliderAlts={sliderAlts}
        isLoading={isCarouselLoading}
      />
      {/* <div>留学专区</div> */}
      {isEduVideo && (
        <VideoEmbed
          isVideoLoading={isEduVideoLoading}
          embedId={eduVideoData.id}
          description={eduVideoData.description}
        />
      )}
      {!isSamplesLoading && <CardsList sampleListData={samplesData} />}
      {/* <div>移民专区</div> */}
      {isImmVideo && (
        <VideoEmbed
          isVideoLoading={isImmVideoLoading}
          embedId={immVideoData.id}
          description={immVideoData.description}
        />
      )}
      <article></article>
    </>
  );
}
