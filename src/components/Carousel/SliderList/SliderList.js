import React from "react";
import { useContext } from "react";
import { Skeleton } from "@mui/material";
import Slider from "../Slider/Slider";

import { CarouselContext } from "../CarouselContext";

export default function SliderList() {
  const { sliderImageSrcs, sliderAlts, isLoading } =
    useContext(CarouselContext);

  //GOOGLE: skeleton
  return isLoading ? (
    <Skeleton variant="rounded" animation="wave" width="100%" height="100%" />
  ) : (
    sliderImageSrcs.map((sliderImageSrc, i) => (
      <Slider key={i} src={sliderImageSrc} alt={sliderAlts[i]} />
    ))
  );
}
