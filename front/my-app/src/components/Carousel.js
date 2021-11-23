import React from "react";
import Carousel from 'react-elastic-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';

export const Photo = ({photos, second, setSecond}) => {
   return (
        <>
            {photos && <Carousel  pagination={false} itemPadding={[0]} itemsToShow={6} enableSwipe={false}>
                {photos?.map(photo =>
                    <PhotoComponent>
                        <img src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>
                        <p className="legend">{`00:${photo.slice(50, -4)}`}</p>
                    </PhotoComponent>
                )}
            </Carousel>
            }
        </>
    );
};

const PhotoComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 80%;
    border-radius: 5%;
    position: relative;
  }
  p {
    z-index: 10;
    position: relative;
    bottom: 15%;
    left: 40%;
    background: #fff;
    border-radius: 35%;
    height: 20px;
    font-weight: 700;
    opacity: 80%;
    width: 35px;
    text-align: center;
    font-size: 12px;
  }
`;