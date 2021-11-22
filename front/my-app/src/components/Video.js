import React, {useRef, useState} from 'react';
import '../App.css';
import {PlayPauseVideoButton, DownloadVideoButton} from "../components/Buttons"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Video = ({video, second}) => {
    const [toggle, setToggle] = useState(false);
    const vidRef = useRef(null);
    let src = `http://localhost:3000/${video}#t=${second}`
    const id = video?.slice(6, -4)
    const triggerToggle = () => {
        setToggle(!toggle)
        toggle ? vidRef?.current?.play() : vidRef?.current?.pause();
    }
    return (
        <>
        {video == null ?
            <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
            <>
                <div  className="download-video-block">
                    <DownloadVideoButton src={src} id={id}/>
                </div>
                <div className="video">
                    <video autoPlay muted onEnded={() => setToggle(!toggle)} ref={vidRef} src={src}/>
                    <PlayPauseVideoButton triggerToggle={triggerToggle} toggle={toggle}/>
                </div>
            </>
        }
        </>
    )
}



