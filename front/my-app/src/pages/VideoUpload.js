import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import React, {useState, useEffect} from "react";
import {CancelButton, SaveButton, OpenButton, CopyButton, ShareButtons} from '../components/Buttons';
import {VideoUploadForm} from '../components/VideoUploadForm';
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import {notification} from '../components/Toasts';
import CategorySelect from '../components/CategorySelect';

const VideoUpload = () => {
    const {state} = useUser();
    const [initialVideoName, setInitialVideoName] = useState("Choose video");
    const [chosenVideo, setChosenVideo] = useState(null);
    const [videoName, setVideoName] = useState(null);
    const [isSelectCategory, setIsSelectCategory] = useState("");
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [loading, setLoading] = useState(null);
    const onUpload = async () => {
        setVideoName("");
        setLoading(true);
        setUploadedVideo({id: null});
        const data = new FormData();
        data.append('video', chosenVideo);
        data.append('name', videoName);
        data.append('userId', state.userId);
        data.append('categoryId', isSelectCategory);
        const headers = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const uploadVideoUrl = "http://localhost:3000/upload-video";
        const uploadedVideoUrl = `http://localhost:3001/uploaded-video/`;
        await axios.post(uploadVideoUrl, data, headers)
            .then(resp => {
                notification('success', `Videо ${videoName} is uploaded`)
                setUploadedVideo({id: resp.data.id, path: uploadedVideoUrl + resp.data.id});
                setLoading(false);
            })
            .catch(err => notification('error', err.message));
    };
    const onCancel = () => {
        setIsSelectCategory("");
        setChosenVideo(null);
        setInitialVideoName("Choose video");
    };
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setVideoName("");
            setUploadedVideo({id: null});
            setChosenVideo(e.target.files[0]);
            setInitialVideoName(e.target.files[0].name);
        } else onCancel();
    };
    const copyTextToClipboard = async () => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(uploadedVideo?.path);
        } else {
            return document.execCommand('copy', true, uploadedVideo?.path);
        };
    };
    return (
        <>
            {loading ? <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
            <div className="video-upload">
                <VideoUploadForm handleFileChange={handleFileChange} name={initialVideoName} id={uploadedVideo?.id}/>
                {!uploadedVideo?.id && chosenVideo &&
                    <UploadVideoButtons>
                        <input type="text" placeholder="Enter video name" value={videoName} onChange={e => setVideoName(e.target.value)}/>
                        <CategorySelect isSelectCategory={isSelectCategory} setIsSelectCategory={setIsSelectCategory}/>
                        <SaveButton videoName={videoName} isSelectCategory={isSelectCategory} onUpload={onUpload}/>
                        <CancelButton onCancel={onCancel}/>
                    </UploadVideoButtons> }
                {uploadedVideo?.id && <UploadedVideoButtons>
                    <div>
                        <OpenButton href={uploadedVideo?.path}/>
                        <CopyButton copyToClipboard={copyTextToClipboard}>Copy</CopyButton>
                        <ShareButtons url={uploadedVideo?.path}/>
                    </div>
                </UploadedVideoButtons> }
            </div> }
        </>
    );
};

export default VideoUpload;

const UploadedVideoButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
  a {
    margin: 0 15px;
  }
  button {
    margin: 0 3px;
  }
`;

const UploadVideoButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  a, button {
    margin: 0 5px;
  }
  input {
    margin: 0 5px;
  }
  input:focus{
    outline: none;
  }
`;