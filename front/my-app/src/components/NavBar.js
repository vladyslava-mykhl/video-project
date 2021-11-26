import React from 'react';
import { Nav, Container,  Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    const onLogout = () => {
        localStorage.removeItem('user')
        window.location.replace("http://localhost:3001");
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navigation</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/ulpoad-video">Upload Video</Nav.Link>
                        {localStorage.user ?
                            <Nav.Link onClick={onLogout}>Logout</Nav.Link> :
                            <>
                                <Nav.Link href="/registration">Registration</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;