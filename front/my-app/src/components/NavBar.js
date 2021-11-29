import React from 'react';
import { Nav, Container,  Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useUser} from '../hooks/useUser';
import styled from 'styled-components';

const NavBar = () => {
    const {onLogout, isLoggedIn, state} = useUser();
    return (
        <NavbarContainer>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navigation</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/get-all-video">Video</Nav.Link>
                        {isLoggedIn ?
                            <>
                                <Nav.Link href="/ulpoad-video">Upload Video</Nav.Link>
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link href="/registration">Registration</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                    {state.userName && <p>{`user ${state.userName}`}</p>}
                </Container>
            </Navbar>
        </NavbarContainer>
    );
};

export default NavBar;

const NavbarContainer = styled.div`
   p {
      color: rgba(255,255,255,.55);
      margin: 0 auto;
    }
`;