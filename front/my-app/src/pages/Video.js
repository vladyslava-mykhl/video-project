import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';

const AllVideo = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(null);
    console.log(photos)
    useEffect(async () => {
        setLoading(true);
        axios.post("http://localhost:3000/get-all-video")
            .then(res => {
                res.data.map(data => photos.push(data.screenPath[0]))
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
        });
    }, [0]);
    return (
           <ScreenComponent>
               {photos?.map(photo =>
                   <img src={`http://localhost:3000/${photo}`} alt="screen"/>
               )}
           </ScreenComponent>
    );
};

export default AllVideo;

const ScreenComponent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  img {
    width: 25%;
    margin: 20px;
  }
`;
