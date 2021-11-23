import React from 'react';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Home = () => {
    return (
        <ContainerHome>
            <Alert variant="dark">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert message. This example
                    text is going to run a bit longer so that you can see how spacing within an
                    alert works with this kind of content.
                </p>
                <hr/>
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice
                    and tidy.
                </p>
            </Alert>
        </ContainerHome>
    );
};

export default Home;

const ContainerHome = styled.div`
  .alert {
    margin: 2em 7em !important;
  }
`;