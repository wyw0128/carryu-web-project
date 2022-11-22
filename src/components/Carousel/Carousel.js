import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CarouselContextProvider } from "../../components/Carousel/CarouselContext";
import SliderList from "./SliderList/SliderList";
import Dots from "./Dots/Dots";
import { CarouselWrapper, SlidersWrapper } from "./styles";
export default function Carousel(props) {
  const { sliderImageSrcs, sliderAlts, isLoading } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(null);
  const sliderWrapperRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const goToSlide = (newSlide) => {
    sliderWrapperRef.current.style.transform = `translateX(${
      100 * (0 - newSlide)
    }%)`;
  };
  useEffect(() => {
    // NOTE: How to get computed width value of an element
    setCarouselHeight(carouselWrapperRef.current.offsetWidth / 3);
  }, []);
  return (
    <CarouselContextProvider value={{ sliderImageSrcs, sliderAlts, isLoading }}>
      <CarouselWrapper ref={carouselWrapperRef} carouselHeight={carouselHeight}>
        <SlidersWrapper ref={sliderWrapperRef}>
          <SliderList data={props.data} />
        </SlidersWrapper>
        <Dots
          goToSlide={goToSlide}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </CarouselWrapper>
    </CarouselContextProvider>
  );
}
Carousel.propTypes = {
  sliderImageSrcs: PropTypes.array.isRequired,
  sliderAlts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
