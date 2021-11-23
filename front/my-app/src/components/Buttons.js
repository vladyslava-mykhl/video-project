import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import {faPause, faPlay, faDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FacebookShareButton, TelegramShareButton, EmailShareButton} from "react-share";
import {FacebookIcon, TelegramIcon, EmailIcon} from "react-share";

export const CancelButton = ({file, onCancel}) => {
    return (
        <>
            {file && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
        </>
    );
};

export const SaveButton = ({file, onUpload}) => {
    return (
        <>
            {file &&  <Button variant="secondary"  onClick={onUpload}>Save</Button>}
        </>
    );
};

export const OpenButton = ({href}) => {
    return (
        <>
            <a href={href} className="btn btn-outline-secondary">Click to open</a>
        </>
    );
};

export const CopyButton = ({copyToClipboard, text}) => {
    return (
        <>
            <Button variant="outline-secondary" onClick={copyToClipboard}>Copy</Button>
        </>
    );
};

export const ShareButtons = ({url}) => {
    return (
        <div className="share-buttons">
            <FacebookShareButton url={url}>
                <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon size={35} round={true} />
            </TelegramShareButton>
            <EmailShareButton url={url}>
                <EmailIcon size={35} round={true} />
            </EmailShareButton>
        </div>
    );
};

export const PlayPauseVideoButton = ({triggerToggle, toggle}) => {
    return (
        <>
            <button className="play-video-btn" onClick={triggerToggle}>
                <span>{toggle ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}</span>
            </button>
        </>
    );
};

export const DownloadVideoButton = ({handleClick, isLoading}) => {
    return (
        <>
            <Button className="download-video-btn" variant="dark" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                <span><FontAwesomeIcon icon={faDownload} />{isLoading ? 'Loading…' : 'Click to load'}</span>
            </Button>
        </>
    );
};


