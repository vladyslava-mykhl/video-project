import React, {useRef, useState} from 'react';
import '../App.css';
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Video = ({video, second}) => {
    const [toggle, setToggle] = useState(true);
    const [hoverOnVideo, setHoverOnVideo] = useState();
    const vidRef = useRef(null);

    const triggerToggle = () => {
        setToggle(!toggle)
        toggle ? vidRef.current.play() : vidRef.current.pause();
    }

    return (
        <div className="video" onMouseEnter = {()=>setHoverOnVideo(true)} onMouseLeave = {()=>setHoverOnVideo(false)}>
            {video && <video
               onEnded={() => setToggle(!toggle)}
               ref={vidRef}
               src={`http://localhost:3000/${video}#t=${second}`}/>
            }
            {hoverOnVideo && <div className="video-btn" onClick={triggerToggle}>
                    <span>{toggle ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}</span>
            </div>
            }
        </div>
    )
}

