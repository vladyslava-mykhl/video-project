import React from 'react';
import {Paper, Typography, Link} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Home = () => {
    return (
        <Paper elevation={12}   className="home-container" >
            <Typography variant="h2" component="h2">
                Hey, nice to see <span className="home-span">you</span>
            </Typography>
            <Typography variant="body1" component="p">
                Aww yeah, you successfully read this important alert message. This example
                text is going to run a bit longer so that you can see how spacing within an
                alert works with this kind of content.  Aww yeah, you successfully read this
                important alert message. This example text is going to run a bit longer so that
                you can see how spacing within an alert works with this kind of content.
            </Typography>
            <Typography variant="h5" component="h5">
                <Link underline="none" href="/get-all-video" variant="contained" color="primary">
                    Get started<ArrowForwardIosIcon size="large"/>
                </Link>
            </Typography>
        </Paper>
    );
};

export default Home;
