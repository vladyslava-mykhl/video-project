import '../App.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import React, {useState, useEffect} from "react";
import Loader from "react-loader-spinner";
import styled from 'styled-components';
import {useUser} from '../hooks/useUser';
import Post from '../components/Post'
import {notification} from '../components/Toasts';
import {FilterVideoButton} from '../components/Buttons';
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
                <VideoFit>
                    <FilterContainer>
                        {state.userId && <FilterVideoButton isMy={isMy} onToggle={() => setIsMy(!isMy)}/> }
                        <CategorySelect isSelectCategory={isSelectCategory} setIsSelectCategory={setIsSelectCategory}/>
                    </FilterContainer>
                    {video.length === 0 ?
                        <div>
                            <p>This category is empty</p>
                        </div>
                        : <Post video={video} onWatched={onWatched}></Post>
                    }
                </VideoFit>
            }
        </>
    );
};

export default ShowVideo;

const VideoFit = styled.div`
  p {
   text-align: center;
    vertical-align: center;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`