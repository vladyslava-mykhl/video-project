import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-elastic-carousel';

export const Photo = ({photos, second, setSecond}) => {
    const breakPoints = [
        { width: 1, itemsToShow: 4 }
    ];
    return (
        <>
            {/*{photos && <Carousel breakPoints={breakPoints}>*/}
            {/*    {photos?.map(photo =>*/}
            {/*        <div className="photo">*/}
            {/*            <img src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>*/}
            {/*            <p className="legend">{photo.slice(50, -4)}</p>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</Carousel>*/}
            {/*}*/}
        </>
    )
}
