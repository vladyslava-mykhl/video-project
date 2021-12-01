import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React, {useState} from "react";
import {CancelButton, SaveButton, OpenButton, CopyButton, ShareButtons} from '../components/Buttons';
import {VideoUploadForm} from '../components/VideoUploadForm';
import Loader from "react-loader-spinner";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';

const VideoUpload = () => {
    const {state} = useUser();
    const [initialVideoName, setInitialVideoName] = useState("Choose video");
    const [chosenVideo, setChosenVideo] = useState(null);
    const [name, setName] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [loading, setLoading] = useState(null);
    toast.configure();
    const successToast = () => toast.success(`Videо ${name} is uploaded`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: true
    });
    const errorToast = (err) => toast.error(err, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: true
    });
    const onUpload = async () => {
        setName("");
        setLoading(true);
        setUploadedVideo({id: null});
        try {
            const data = new FormData();
            data.append('video', chosenVideo);
            data.append('name', name);
            data.append('userId', state.userId);
            const headers = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const uploadVideoUrl = "http://localhost:3000/upload-video";
            const uploadedVideoUrl = `http://localhost:3001/uploaded-video/`;
            const result = await axios.post(uploadVideoUrl, data, headers)
                .then(resp => {
                    successToast();
                    return resp.data;
                })
                .catch(err => errorToast(err));
            setUploadedVideo({id: result.id, path: uploadedVideoUrl + result?.id});
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        };
    };
    const onCancel = () => {
        setChosenVideo(null);
        setInitialVideoName("Choose video");
    };
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setName("");
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
            <div className="App">
                {loading ? <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
                    <div className="video-upload">
                        <VideoUploadForm handleFileChange={handleFileChange} name={initialVideoName} id={uploadedVideo?.id}/>
                        {!uploadedVideo?.id && chosenVideo &&
                            <UploadVideoButtons>
                                <input type="text" placeholder="Enter video name" value={name} onChange={e => setName(e.target.value)}/>
                                <SaveButton onUpload={onUpload}/>
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
            </div>
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