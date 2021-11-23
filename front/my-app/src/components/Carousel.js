import React from "react";
import Carousel from 'react-elastic-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';

export const Photo = ({photos, second, setSecond}) => {
    const breakPoints = [{ width: 320, itemsToShow: 1}, {width: 600, itemsToShow: 2}, {width: 900, itemsToShow: 3}, {width: 1240, itemsToShow: 6}]
    return (
        <>
            {photos && <Carousel  pagination={false} itemPadding={[0]} breakPoints={breakPoints} enableSwipe={false}>
                {photos?.map(photo =>
                    <PhotoComponent>
                        <img src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>
                        <p className="legend">{(photo.slice(50, -4)).length < 2 ? `00:0${photo.slice(50, -4)}` : `00:${photo.slice(50, -4)}`}</p>
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
  justify-content: center; 
  position: relative;
  overflow: visible;
  img {
    border-radius: 3%;
    cursor: pointer;
    transition: all 500ms;
}
  img:hover {
     transform: scale(1.05);
   }
  p {
    z-index: 10;
    position: absolute;
    bottom: 0;
    right: 5%;
    background: #fff;
    border-radius: 10px;
    height: 20px;
    font-weight: 700;
    opacity: 80%;
    width: 35px;
    text-align: center;
    font-size: 12px;
  }
`;