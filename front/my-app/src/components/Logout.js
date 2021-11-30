import {useUser} from '../hooks/useUser';
import React, {useEffect} from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Logout = () => {
    const {onLogout} = useUser();
    useEffect(() => {
        onLogout();
    })
    return (
        <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/>
    );
};

export default Logout;