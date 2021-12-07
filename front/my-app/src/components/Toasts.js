import * as React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {Snackbar, Alert, Button} from '@mui/material';

toast.configure();

export const notification = (type, value) => {
    switch (type) {
        case 'success':
            toast.success(value, {
                position: "top-center",
                autoClose: 4000,
                closeOnClick: true,
                draggable: true
            });
            break;
        default:
            toast.error(value, {
                position: "top-center",
                autoClose: false,
                closeOnClick: true,
                draggable: true
            });
    };
    return (
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert  severity={type} sx={{  width: '100%' }}>
                {value}
            </Alert>
        </Snackbar>
    )
};

