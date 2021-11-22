import React, {useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


export const Slider = ({photos, second, setSecond}) => {
    const [currentSlide, setCurrentSlide] = useState()
    const [autoPlay, setAutoPlay] = useState()
    return (
        <div className="slider">
            <Carousel
                thumbWidth={200}
                showThumbs={true}
                showIndicators={false}
                showStatus={false}
            >
                {photos?.map(photo => <div className="photo">
                    <img src={`http://localhost:3000/${photo}`} alt="screen" onClick={e => setSecond(e.target.src.slice(72, -4))}/>
                    <p className="legend">{photo.slice(50, -4)}</p>
                </div> )}
            </Carousel>
        </div>
    );
}


