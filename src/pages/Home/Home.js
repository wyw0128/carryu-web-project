import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardsList from "../../components/CardsList/CardsList";
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
export default function Home() {
  const [sliderImageSrcs, setImageSrcs] = useState([]);
  const [sliderAlts, setSliderAlts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [samplesData, setSamplesData] = useState([]);

  useEffect(() => {
    try {
      client.fetch(carouselQuery, {}).then((sliders) => {
        // if (!sliders.ok == true) throw new Error("Problem with loading sliders.");
        setIsLoading(false);
        setImageSrcs(sliders.map((slider) => urlFor(slider.image.image.asset)));
        setSliderAlts(sliders.map((slider) => slider.image.alt));
      });
      client.fetch(sampleQuery, {}).then((result) => {
        setIsLoading(false);
        setSamplesData(result.map((data) => data));
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      setIsLoading(true);
      setImageSrcs([]);
      setSliderAlts([]);
      setSamplesData([]);
    };
  }, []);

  // console.log(sampleData);

  return (
    <>
      <Carousel
        sliderImageSrcs={sliderImageSrcs}
        sliderAlts={sliderAlts}
        isLoading={isLoading}
      />
      <CardsList sampleListData={samplesData} />
    </>
  );
}
