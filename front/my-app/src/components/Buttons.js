import {Button} from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useRef} from "react";

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



