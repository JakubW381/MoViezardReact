import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 
import './Layout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const token = Cookies.get('session_token');  
            setIsLoggedIn(!!token);
        } catch (err) {
            console.error("Error reading cookies:", err);
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <main>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>

                    <Nav className="d-flex align-items-center">
                        {isLoggedIn ? (
                            <Button as={NavLink} to="/profile" variant="outline-info" className="me-2">
                                Profile
                            </Button>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>


            <Outlet />
        </main>
    );
};

export default Layout;
