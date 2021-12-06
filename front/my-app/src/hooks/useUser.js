import React, {useEffect} from "react";
import {UserContext} from "../context/UserContext";
import {notification} from '../components/Toasts';
const axios = require('axios');

export const useUser = (phone, password) => {
    const { state, dispatch } = React.useContext(UserContext);
    const { isLoggedIn } = state;
    useEffect(() => {
        if (localStorage.user) {
            loginUser(JSON.parse(localStorage.user))
        } else {
            onLogout();
        };
    },[]);
    const onLog = (phone, password) => {
        axios.post('http://localhost:3000/login', {
            phone,
            password,
        }).then(response => {
            const user = response.data.preparedUser;
            localStorage.setItem('user', JSON.stringify(user));
            loginUser(user);
        }).catch(error => notification('error', error.response.data.error))
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
            notification('success', `You have successfully registered and logged in`);
        }).catch(error => notification('error', error.response.data.error))
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
    };
    return {onLog, onLogout, onReg, isLoggedIn, state};
};

