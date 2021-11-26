import React, {useContext, useState, useReducer} from "react";
import {UserReducer} from "../reducers/userReducer";
const axios = require('axios');

export const useUser = () => {
    const [state, dispatch] = useReducer(UserReducer, JSON.parse(localStorage.getItem('user')));
    const onLog = (phone, password) => {
        axios.post('http://localhost:3000/login', {
            phone,
            password,
        }).then(response => {
            const user = response.data.preparedUser;
            dispatch({
                type: 'SET_USER',
                userId: user._id,
                userName: user.username
            })
            localStorage.setItem('user', JSON.stringify(user));
            window.location.replace("http://localhost:3001");
        }).catch(error => alert(error.response.data.error));
    };
}

