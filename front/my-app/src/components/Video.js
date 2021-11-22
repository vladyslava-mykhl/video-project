import React, {useRef, useState} from 'react';
import '../App.css';
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {PlayPauseVideoButton, DownloadVideoButton} from "../components/Buttons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Video = ({video, second}) => {
    const [toggle, setToggle] = useState(true);
    const [loader, setLoader] = useState();
    const vidRef = useRef(null);
    const id = video?.slice(6, -4)
    const src = `http://localhost:3000/${video}#t=${second}`
    console.log(vidRef)
    const triggerToggle = () => {
        setToggle(!toggle)
        toggle ? vidRef.current.play() : vidRef.current.pause();
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
                    <video autoPlay muted  onEnded={() => setToggle(!toggle)} ref={vidRef} src={src}/>
                    <PlayPauseVideoButton triggerToggle={triggerToggle} toggle={toggle}/>
                </div>
            </>
        }
        </>
    )
}

