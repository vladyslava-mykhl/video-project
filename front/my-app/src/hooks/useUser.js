import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import { toast } from 'react-toastify';
const axios = require('axios');

export const useUser = (phone, password) => {
    const { state, dispatch } = React.useContext(UserContext);
    const { isLoggedIn } = state;
    toast.configure();
    useEffect(() => {
        localStorage?.user &&
            dispatch({
                type: 'LOGIN',
                payload: {
                    userId: JSON.parse(localStorage.user)._id,
                    userName: JSON.parse(localStorage.user).username
                }
            });
    },[]);
    const onLog = (phone, password) => {
        axios.post('http://localhost:3000/login', {
            phone,
            password,
        }).then(response => {
            const user = response.data.preparedUser;
            dispatch({
                type: 'LOGIN',
                payload: {
                    userId: user._id,
                    userName: user.username
                }
            });
            localStorage.setItem('user', JSON.stringify(user));
        }).catch(error => toast.error(error.response.data.error, {
            position: "top-center",
            autoClose: false,
            closeOnClick: true,
            draggable: true
        }));
    };
    const onReg = (phone, password, username) => {
        axios.post('http://localhost:3000/registration', {
            phone,
            password,
            username
        }).then(response => {
            const user = response.data;
            dispatch({
                type: 'LOGIN',
                payload: {
                    userId: user._id,
                    userName: user.username
                }
            });
           localStorage.setItem('user', JSON.stringify(user));
           toast.success(`You have successfully registered and logged in`, {
                position: "top-center",
                autoClose: 4000,
                closeOnClick: true,
                draggable: true
           });
        }).catch(error => toast.error(error.response.data.error, {
                position: "top-center",
                autoClose: false,
                closeOnClick: true,
                draggable: true
        }));
    };
    const onLogout = () => {
        dispatch({
            type: 'LOGOUT'
        });
        localStorage.removeItem('user');
    };
    return {onLog, onLogout, onReg, isLoggedIn, state};
};

