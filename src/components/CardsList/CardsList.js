import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { Skeleton } from "@mui/material";
import { CardsListContextProvider } from "./CardsListContext";
import Card from "../Card/Card";
import styled from "styled-components";

const CardWrapper = styled.div`
  padding: 0 0 10px 20px;
`;

export default function CardsList({ width, sampleListData, isSamplesLoading }) {
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
      {isSamplesLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="100%"
        />
      ) : (
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
      )}
    </CardsListContextProvider>
  );
}
CardsList.propTypes = {
  width: PropTypes.number.isRequired,
  sampleListData: PropTypes.array.isRequired,
  isSamplesLoading: PropTypes.bool.isRequired,
};
