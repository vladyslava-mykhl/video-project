import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import {faPause, faPlay, faDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CancelButton = ({file, onCancel}) => {
    return (
        <>
            {file &&  <Button variant="secondary"  onClick={onCancel} >Cancel</Button>}

        </>
        )
    }

export const SaveButton = ({file, onUpload}) => {
    return (
        <>
            {file &&  <Button variant="secondary"  onClick={onUpload}>Save</Button>}
        </>
    )
}

export const OpenButton = ({href}) => {
    return (
        <>
            <a href={href} className="btn btn-outline-secondary">Click to open</a>
        </>
    )
}
export const CopyButton = ({copyToClipboard, text}) => {
    return (
        <>
            <Button variant="outline-secondary" onClick={copyToClipboard}>Copy</Button>

        </>
    )
}

export const PlayPauseVideoButton = ({hoverOnVideo, triggerToggle, toggle}) => {
    return (
        <>
                <button className="play-video-btn" onClick={triggerToggle}>
                    <span>{toggle ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}</span>
                </button>
        </>
    )
}
export const DownloadVideoButton = ({src, id}) => {
    const [isLoading, setLoading] = useState(false);
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
            <Button className="download-video-btn" variant="dark" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                <span><FontAwesomeIcon icon={faDownload} />{isLoading ? 'Loading…' : 'Click to load'}</span>
            </Button>
        </>
    )
}


