import React, {useRef, useState, useEffect} from 'react';
import {PlayPauseVideoButton, DownloadVideoButton} from "../components/Buttons";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '../App.css';

export const Video = ({video, second}) => {
    const [isLoading, setLoading] = useState(false);
    const [toggle, setToggle] = useState();
    const vidRef = useRef(null);
    const src = `http://localhost:3000/${video}#t=${second}`;
    const id = video?.slice(6, -4);
    const triggerToggle = () => {
        setToggle(!toggle);
        toggle ? vidRef?.current?.play() : vidRef?.current?.pause();
    };
    useEffect(() => {
        if (second === 1 ) setToggle(true);
        else {
          setToggle(false);
          vidRef?.current?.play();
        };
    },[second]);
    useEffect(() => {
        if (isLoading) {
            fetch(src)
                .then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = `${id}.mp4`;
                        a.click();
                        setLoading(false);
                    });
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        };
    }, [isLoading]);
    const handleClick = () => setLoading(true);
    return (
        <>
        {video == null ?
            <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
            <>
                <div  className="download-video-block">
                    <DownloadVideoButton handleClick={handleClick} isLoading={isLoading}/>
                </div>
                <div className="video">
                    <video onEnded={() => setToggle(!toggle)} ref={vidRef} src={src}/>
                    <PlayPauseVideoButton triggerToggle={triggerToggle} toggle={toggle}/>
                </div>
            </>
        }
        </>
    );
};

