import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import {notification} from '../components/Toasts';
import {FilterVideoButton, CancelButton} from '../components/Buttons';
import CategorySelect from '../components/CategorySelect';

const ShowVideo = () => {
    const {state} = useUser();
    const [video, setVideo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMy, setIsMy] = useState(false);
    const [isSelectCategory, setIsSelectCategory] = useState("");
    const onVideoFilter = () => {
        setLoading(true);
        const query = {};
        if (isSelectCategory) query.category = isSelectCategory;
        if (isMy) query.user = state.userId;
        axios.get("http://localhost:3000/get-filter-video", {params: query})
            .then(res => {
                setVideo(res.data);
                setLoading(false);
            })
            .catch(error => notification('error', error.message));
    };
    const onCancel = () => {
        setIsSelectCategory("");
        onVideoFilter();
    };
    const onWatched = (id) => {
        axios.get("http://localhost:3000/get-views-video", { params: {videoId: id}})
            .then(res => {
                console.log(res);
            })
            .catch(error => notification('error',error.message));
    };
    useEffect(() => {
        if(!loading) {
            setLoading(true);
            onVideoFilter();
        };
    }, [isMy, isSelectCategory]);
    return (
        <>
            {loading ? <Loader type="TailSpin" color='#6c757d' height={150} width={150} className="video-upload"/> :
                <>
                    <FilterVideoButton isMy={isMy} onToggle={() => setIsMy(!isMy)}/>
                    <CategorySelect isSelectCategory={isSelectCategory} setIsSelectCategory={setIsSelectCategory}/>
                    {isSelectCategory && <CancelButton onCancel={onCancel}/>}
                    <ScreenComponent>
                        {video.length === 0 ? <p>This category is empty</p> : video?.map((video) =>
                        <div key={video.videoPath} className="post">
                            <p key={video.user.username}> {video.user?.username}</p>
                            <a key={video.screenPath[0]} onClick={() => onWatched(video.id)} href={`http://localhost:3001/uploaded-video/${video.id}`}>
                                <img key={video.screenPath[0]} src={`http://localhost:3000/${video.screenPath[0]}`} alt="screen"/>
                            </a>
                            <div key={video.videoPath} className="post-text">
                                <p key={video.name}>{video.name}</p>
                                <p key={video.name + video.views}>{video.views}</p>
                                <p key={video.id}>{video.createdAt.replace(/(?![^TZ])./g, ' ').slice(0, 19)}</p>
                            </div>
                        </div>
                        )}
                    </ScreenComponent>
                </>
            }
        </>
    );
};

export default ShowVideo;

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
