import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import { toast } from 'react-toastify';
const axios = require('axios');

export const useUser = (phone, password) => {
    const { state, dispatch } = React.useContext(UserContext);
    const { isLoggedIn } = state;
    toast.configure();
    useEffect(() => {
        if (localStorage.user) {
            loginUser(JSON.parse(localStorage.user))
        } else {
            onLogout();
        }
    },[]);
    const onLog = (phone, password) => {
        axios.post('http://localhost:3000/login', {
            phone,
            password,
        }).then(response => {
            const user = response.data.preparedUser;
            localStorage.setItem('user', JSON.stringify(user));
            loginUser(user);
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
            loginUser(user);
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
    function onLogout () {
        dispatch({
            type: 'LOGOUT'
        });
        localStorage.removeItem('user');
    };

    function loginUser (user) {
        dispatch({
            type: 'LOGIN',
            payload: {
                userId: user._id,
                userName: user.username
            }
        });
    }
    return {onLog, onLogout, onReg, isLoggedIn, state};
};

