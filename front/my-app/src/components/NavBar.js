import React from 'react';
import { Nav, Container,  Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Navigation</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/ulpoad-video">Upload Video</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )}

export default NavBar