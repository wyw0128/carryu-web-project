import React, { useState, useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";

import { urlFor } from "../../utils/sanity-utils";
const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "s5jcdx1h",
  dataset: "production",
  apiVersion: "2022-11-18", // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true,
});

const query = '*[_type == "Sliders"] | order(_updatedAt desc) {image}';

export default function Home() {
  const [sliderImageSrcs, setImageSrcs] = useState([]);
  const [sliderAlts, setSliderAlts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      client.fetch(query, {}).then((sliders) => {
        // if (!sliders.ok == true) throw new Error("Problem with loading sliders.");
        setIsLoading(false);
        setImageSrcs(sliders.map((slider) => urlFor(slider.image.image.asset)));
        setSliderAlts(sliders.map((slider) => slider.image.alt));
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      setIsLoading(true);
      setImageSrcs([]);
      setSliderAlts([]);
    };
  }, []);
  return (
    <Carousel
      sliderImageSrcs={sliderImageSrcs}
      sliderAlts={sliderAlts}
      isLoading={isLoading}
    />
  );
}
