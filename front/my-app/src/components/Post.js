import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CardHeader from '@mui/material/CardHeader';
import { blueGrey } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';


const Post = ({onWatched, video}) => {
    return (
        <CardsContainer>
                {video?.map(video =>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={video.user?.username}
                        subheader={new Date(video.createdAt).toLocaleString('en-us', { month: 'long',  year: 'numeric', day: 'numeric' })}
                    />
                     <a onClick={()=>onWatched(video.id)} href={`http://localhost:3001/uploaded-video/${video.id}`}>
                        <CardMedia
                            component="img"
                            height="194"
                            image={`http://localhost:3000/${video.screenPath[0]}`}
                            alt="post"
                        />
                    </a>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">{video.name}</Typography>
                        <CardActions disableSpacing>
                            <Typography>{video.views}</Typography>
                            <VisibilityIcon  sx={{color: blueGrey[500]}}/>
                        </CardActions>
                    </CardContent>
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
       margin: 20px;
        -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
       border-radius: 3%;
       transition: all 500ms;
     }
      .MuiPaper-root:hover {
        transform: scale(1.05);
      }
      .MuiCardContent-root, .MuiCardHeader-content  {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .MuiCardActions-root {
        display: flex;
        justify-content: flex-end;
        align-items: center;
          p {
            margin: 0 5px;
        }
      }
    .MuiCardContent-root {
      padding: 15px !important;
    }
`
