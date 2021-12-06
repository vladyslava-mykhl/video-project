import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardHeader from '@mui/material/CardHeader';
import { lightBlue } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {faEye} from "@fortawesome/free-solid-svg-icons";

const Post = ({onWatched, video}) => {
    return (
        <CardsContainer>
                {video?.map(video =>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            title={video.user?.username}
                            subheader={new Date(video.createdAt).toLocaleString('en-us', { month: 'long',  year: 'numeric', day: 'numeric' })}
                        />
                         <a href={`http://localhost:3001/uploaded-video/${video.id}`}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={`http://localhost:3000/${video.screenPath[0]}`}
                                alt="post"
                            />
                        </a>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">{video.name}</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Typography>{video.views}<VisibilityIcon  sx={{color: lightBlue[500]}}/></Typography>
                        </CardActions>
                    </Card>
                )}
        </CardsContainer>
    );
};

export default Post;

const CardsContainer = styled.div`
     display: flex !important;
     flex-direction: row !important;
     flex-wrap: wrap !important;
     justify-content: center;
     .MuiPaper-root {
       width: 25%;
       margin: 20px;
     }
  .MuiCardContent-root, .MuiCardHeader-content  {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`
