import '../App.css';
import axios from "axios";
import React, {useState, useEffect } from "react";
import {Video} from '../components/Video';
import {Photo} from '../components/Carousel';
import styled from 'styled-components';

const VideoUpload = () => {
    const [photos, setPhotos] = useState(null);
    const [videos, setVideo] = useState(null);
    const [second, setSecond] = useState(1);
    const href = window.location.href;
    const id = href.split("/")[4];
    const data = new FormData();
    data.append('id', id);
    const url = `http://localhost:3000/uploaded-video/${id}`;
    const headers = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    };
    useEffect(() => {
        const onUpload = async () => {
            setPhotos(null);
            setVideo(null);
            try {
                const result = await axios.post(url, data, headers).then(resp => resp.data).catch((err) => console.log(err));
                const photo = result?.photo;
                const video = result?.video;
                setPhotos(photo);
                setVideo(video);
                console.log(result)
            } catch (e) {
                console.log(e);
            };
        };
        onUpload();
    }, []);
    return (
            <UploadedVideoPage>
                <Video video={videos} second={second}/>
                <Photo photos={photos} second={second} setSecond={setSecond}/>
            </UploadedVideoPage>
    );
};

export default VideoUpload;

const UploadedVideoPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;