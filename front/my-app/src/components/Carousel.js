import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-elastic-carousel';

export const Photo = ({photos, second, setSecond}) => {

   return (
        <div className="slider">
            {photos && <Carousel  pagination={false} itemPadding={[0]} itemsToShow={6} enableSwipe={false}>
                {photos?.map(photo =>
                    <div className="photo">
                        <img src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>
                        <p className="legend">{`00:${photo.slice(50, -4)}`}</p>
                    </div>
                )}
            </Carousel>
            }
        </div>
    )
}
