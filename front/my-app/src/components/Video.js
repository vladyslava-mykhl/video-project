import React, {useRef, useState, useEffect} from 'react';
import {PlayPauseVideoButton, DownloadVideoButton} from "../components/Buttons";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import '../App.css';
import styled from 'styled-components';

export const Video = ({video, second}) => {
    const [isLoading, setLoading] = useState(false);
    const [toggle, setToggle] = useState();
    const vidRef = useRef(null);
    const src = `http://localhost:3000/${video}`;
    const id = video?.slice(6, -4);
    const triggerToggle = () => {
        setToggle(!toggle);
        toggle ? vidRef?.current?.play() : vidRef?.current?.pause();
    };
    useEffect(() => {
        if (second === 1 ) setToggle(true);
        else {
          setToggle(false);
          if(vidRef && vidRef.current) {
              vidRef.current.currentTime = second;
          }
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
                <DownloadVideoBlock>
                    <DownloadVideoButton handleClick={handleClick} isLoading={isLoading}/>
                </DownloadVideoBlock>
                <VideoComponent>
                    <video onEnded={() => setToggle(!toggle)} ref={vidRef} src={src}/>
                    <PlayPauseVideoButton triggerToggle={triggerToggle} toggle={toggle}/>
                </VideoComponent>
            </>
        }
        </>
    );
};

React.memo(Video, (props, nextProps)=> {
    if(props.second !== nextProps.second) {
        return true
    }
})

const VideoComponent = styled.div`
  display: flex;
  align-content: center;
  position: relative;
  justify-content: center;
  margin: 0 auto 40px auto;
  video {
    border-radius: 8px;
    margin: auto;
    width: 90%;
  }
  button {
    opacity: 0;
    position: absolute;
    width: 75px;
    height: 70px;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
    background: #000000;
    border-radius: 50%;
    border-color: #000;
    cursor: pointer;
    transition: width 200ms, height 200ms;
    transition: opacity 800ms;
  }
  :hover button  {
    opacity: 70%;
  }
  button:hover {
    width: 85px;
    height: 80px;
  }
  button span svg{
    position: absolute;
    color: #fff;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
    transition: transform 1s;
  }
  button:hover span svg {
    transform: rotate(360deg);
  }
`;

const DownloadVideoBlock = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: end;
  button {
    height: 120px;
    transform: translateY(-90px);
    transition: transform 1s;
    display: flex;
    align-items: flex-end;
  }
  button:hover {
    transform: translateY(-30px);
    background-color: #212529;
    border-color: #212529;
  }
`;