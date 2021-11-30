import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';

const AllVideo = () => {
    const [data, setData] = useState();
    console.log(data)
    const [loading, setLoading] = useState(null);
    useEffect(async () => {
        setLoading(true);
        axios.post("http://localhost:3000/get-all-video")
            .then(res => {
                setData(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
        });
    }, []);
    return (
           <ScreenComponent>
               { data?.map((data) =>
                   <div className="post">
                       <a href={data.id}><img src={`http://localhost:3000/${data.screenPath[0]}`} alt="screen"/></a>
                       <div className="post-text">
                           <p>{data.name}</p>
                           <p>{data.createdAt.replace(/(?![^TZ])./g, ' ').slice(0, 19)}</p>
                       </div>
                   </div>
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
  .post {
    width: 25%;
    margin: 20px;
  }
  .post-text {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
  }
  img {
    width: 100%;
  }
`;
