import React from "react";
import Carousel from 'react-elastic-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from 'styled-components';

export const Photo = ({photos, second, setSecond}) => {
    const breakPoints = [{ width: 320, itemsToShow: 1}, {width: 600, itemsToShow: 2}, {width: 900, itemsToShow: 3}, {width: 1200, itemsToShow: 4} , {width: 1400, itemsToShow: 5}]
    return (
        <>
            {photos && <Carousel  pagination={false} itemPadding={[10]} breakPoints={breakPoints} enableSwipe={false}>
                {photos?.map(photo =>
                    <PhotoComponent key={photo}>
                        <img key={photo.slice(50, -4)} src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>
                        <p key={second} className="legend">{(photo.slice(50, -4)).length < 2 ? `00:0${photo.slice(50, -4)}` : `00:${photo.slice(50, -4)}`}</p>
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
  width: 100%;
    max-height: 200px;
  img {
    border-radius: 3%;
    cursor: pointer;
    transition: all 500ms;
    max-height: 100%;
    width: 100%;
    object-fit: cover;
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
