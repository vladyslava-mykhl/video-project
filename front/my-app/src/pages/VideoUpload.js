import '../App.css';
import axios from "axios";
import React, {useState, useRef} from "react";
import {CancelButton, SaveButton, OpenButton, CopyButton} from '../components/Buttons';
import {VideoUploadForm} from '../components/VideoUploadForm';
import {ShareButtons} from  '../components/ShareButtons'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Alert } from 'react-bootstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "react-loader-spinner";

function VideoUpload() {
    const [name, setName] = useState("Choose video");
    const [file, setFile] = useState(null);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(null);
    const textAreaRef = useRef(null);
    const uploadedUrl = `http://localhost:3001/uploaded-video/`;
    const onUpload = async () => {
        setLoading(true);
        setId(null);
        try {
            const data = new FormData();
            data.append('video', file);
            const headers = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
            const url = "http://localhost:3000/upload-video";
            const result = await axios.post(url, data, headers).then(resp => resp.data).catch((err) => console.log(err));
            setId(result?.id);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };
    const onCancel = () => {
        setFile(null);
        setName("Choose video");
    };
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setId(null);
            setFile(e.target.files[0]);
            setName(e.target.files[0].name);
        } else onCancel()
    };
    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    };
    return (
            <div className="App">
                {loading ? <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
                    <div className="video-upload">
                        <VideoUploadForm handleFileChange={handleFileChange} name={name} id={id}/>
                        {!id && <div className="buttons">
                            <SaveButton file={file} onUpload={onUpload}/>
                            <CancelButton file={file} onCancel={onCancel}/>
                        </div>}
                        {id && <div className="open-video">
                            <Alert variant="success">
                                {`Videо ${id} is uploaded`}
                                <input value={uploadedUrl + id} ref={textAreaRef}/>
                            </Alert>
                            <div className="share-block">
                                <OpenButton href={uploadedUrl + id}/>
                                <CopyButton copyToClipboard={copyToClipboard}>Copy</CopyButton>
                                <ShareButtons url={uploadedUrl + id}/>
                            </div>
                        </div> }
                    </div>
                }
            </div>
    )
}

export default VideoUpload;