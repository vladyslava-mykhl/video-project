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

const VideoUpload = () => {
    const [initialVideoName, setInitialVideoName] = useState("Choose video");
    const [chosenVideo, setChosenVideo] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [loading, setLoading] = useState(null);
    toast.configure();
    const successToast = () => toast.success(`Videо ${initialVideoName} is uploaded`, {
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
        setLoading(true);
        setUploadedVideo({id: null});
        try {
            const data = new FormData();
            data.append('video', chosenVideo);
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
                        {!uploadedVideo?.id && <div className="buttons">
                            <SaveButton file={chosenVideo} onUpload={onUpload}/>
                            <CancelButton file={chosenVideo} onCancel={onCancel}/>
                        </div> }
                        {uploadedVideo?.id && <div className="open-video">
                            <div className="share-block">
                                <OpenButton href={uploadedVideo?.path}/>
                                <CopyButton copyToClipboard={copyTextToClipboard}>Copy</CopyButton>
                                <ShareButtons url={uploadedVideo?.path}/>
                            </div>
                        </div> }
                    </div> }
            </div>
        );
    };

export default VideoUpload;