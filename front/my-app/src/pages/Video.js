import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import {FilterVideoButton} from '../components/Buttons';

const AllVideo = () => {
    const {state} = useUser();
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(null);
    const onAllVideo = async() => {
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
    };
    const onFilter = async () => {
        const data = {
            userId: state.userId
        }
        axios.post("http://localhost:3000/get-user-video", data)
            .then(res => {
                setData(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    };
    useEffect(() => {
        onAllVideo();
    }, []);
    const onToggle = () => {
        setToggle(!toggle)
        toggle ? onAllVideo() : onFilter();
    }
    return (
        <>
           <FilterVideoButton toggle={toggle} onToggle={onToggle}/>
           <ScreenComponent>
               { data?.map((data) =>
                   <div className="post">
                       <p>{data.user?.username}</p>
                       <a href={data.id}><img src={`http://localhost:3000/${data.screenPath[0]}`} alt="screen"/></a>
                       <div className="post-text">
                           <p>{data.name}</p>
                           <p>{data.createdAt.replace(/(?![^TZ])./g, ' ').slice(0, 19)}</p>
                       </div>
                   </div>
               )}
           </ScreenComponent>
</>
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
