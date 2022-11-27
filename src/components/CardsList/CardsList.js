import React from "react";
import Slider from "react-slick";
import { CardsListContextProvider } from "./CardsListContext";
import Card from "../Card/Card";
import styled from "styled-components";

const CardWrapper = styled.div`
  padding-right: 20px;
`;

export default function CardsList({ sampleListData }) {
  const settings = {
    infinite: true,
    slidesToShow: 4,
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
            <Card title={`恭喜${data.postName}`} content={data.postText} />
          </CardWrapper>
        ))}
      </Slider>
    </CardsListContextProvider>
  );
}
