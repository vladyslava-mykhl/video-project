import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import {FilterVideoButton} from '../components/Buttons';
import CategorySelect from '../components/CategorySelect'

const AllVideo = () => {
    const {state} = useUser();
    const [toggle, setToggle] = useState(false);
    const [video, setVideo] = useState([]);
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(null);
    const [value, setValue] = useState();
    console.log(video)
    const onAllVideo = async() => {
        setLoading(true);
        axios.get("http://localhost:3000/get-all-video")
            .then(res => {
                setVideo(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    };
    // const onUserVideo = async () => {
    //     axios.get("http://localhost:3000/get-user-video", { params: {userId: state.userId}})
    //         .then(res => {
    //             const result = [...video].filter(x => res.data.some(y => y.name == x.name))
    //             setVideo(result);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             setLoading(false);
    //         });
    // };
    const onVideoFilter = async () => {
        axios.get("http://localhost:3000/get-filter-video", {
            params: {
                categoryId: value,
                userId: state.userId
             }
        })
            .then(res => {
                setVideo(res.data);
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
        toggle ? onAllVideo() : onVideoFilter();
    }
    const onReset = () => {
        setValue("");
        onAllVideo();
    }
    const onWatched = (id) => {
        axios.get("http://localhost:3000/get-views-video", { params: {videoId: id}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <>
           <FilterVideoButton toggle={toggle} onToggle={onToggle}/>
           <CategorySelect value={value} setValue={setValue}/>
            {value &&
                <>
                   <button onClick={onVideoFilter}>Choose</button>
                   <button onClick={onReset}>Reset</button>
                </>
            }
           <ScreenComponent>
               { video.length === 0 ? <p>This category is empty</p> : video?.map((video) =>
                   <div className="post">
                       <p>{video.user?.username}</p>
                       <a onClick={() => onWatched(video.id)} href={`http://localhost:3001/uploaded-video/${video.id}`}><img src={`http://localhost:3000/${video.screenPath[0]}`} alt="screen"/></a>
                       <div className="post-text">
                           <p>{video.name}</p>
                           <p>{video.views}</p>
                           <p>{video.createdAt.replace(/(?![^TZ])./g, ' ').slice(0, 19)}</p>
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
