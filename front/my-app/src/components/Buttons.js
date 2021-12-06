import {FormGroup, FormControlLabel, Switch, Button, Link} from '@mui/material';
import React from "react";
import {faPause, faPlay, faDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FacebookShareButton, TelegramShareButton, EmailShareButton} from "react-share";
import {FacebookIcon, TelegramIcon, EmailIcon} from "react-share";
import styled from 'styled-components';

export const CancelButton = ({onCancel}) => {
    return (
        <>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </>
    );
};

export const SaveButton = ({onUpload, videoName, isSelectCategory}) => {
    return (
        <>
           <Button variant="outlined" disabled = {!videoName || !isSelectCategory} onClick={onUpload}>Save</Button>
        </>
    );
};

export const OpenButton = ({href}) => {
    return (
        <>
            <Link variant="body2" underline="none" href={href}>OPEN</Link>
        </>
    );
};

export const CopyButton = ({copyToClipboard, text}) => {
    return (
        <>
            <Button onClick={copyToClipboard}>Copy</Button>
        </>
    );
};

export const ShareButtons = ({url}) => {
    return (
        <ShareButtonsBlock>
            <FacebookShareButton url={url}>
                <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <TelegramShareButton url={url}>
                <TelegramIcon size={35} round={true} />
            </TelegramShareButton>
            <EmailShareButton url={url}>
                <EmailIcon size={35} round={true} />
            </EmailShareButton>
        </ShareButtonsBlock>
    );
};

export const PlayPauseVideoButton = ({triggerToggle, toggle}) => {
    return (
        <>
            <button onClick={triggerToggle}>
                <span>{toggle ? <FontAwesomeIcon icon={faPlay}/> : <FontAwesomeIcon icon={faPause}/>}</span>
            </button>
        </>
    );
};

export const DownloadVideoButton = ({handleClick, isLoading}) => {
    return (
        <>
            <Button variant="dark" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
                <span><FontAwesomeIcon icon={faDownload} />{isLoading ? 'Loading…' : 'Click to load'}</span>
            </Button>
        </>
    );
};

export const FilterVideoButton = ({onToggle, isMy}) => {
    return (
        <FormGroup>
            <FormControlLabel control={<Switch onChange={()=>onToggle()} checked={isMy} />} label="Show my video" />
        </FormGroup>

    );
};

const ShareButtonsBlock = styled.div`
  display: inline-block;
  margin: 0 15px;*
`;
