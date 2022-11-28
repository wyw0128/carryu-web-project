import React from "react";
import Slider from "react-slick";
import { CardsListContextProvider } from "./CardsListContext";
import Card from "../Card/Card";
import styled from "styled-components";

const CardWrapper = styled.div`
  padding: 0 0 10px 20px;
`;

export default function CardsList({ width, sampleListData }) {
  const slidesToShow = width >= 1024 ? 4 : 2;

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
  };
  return (
    <CardsListContextProvider value={{ sampleListData }}>
      <Slider {...settings}>
        {sampleListData.map((data, i) => (
          <CardWrapper key={i}>
            <Card
              width={width}
              title={`恭喜${data.postName}`}
              content={data.postText}
            />
          </CardWrapper>
        ))}
      </Slider>
    </CardsListContextProvider>
  );
}
