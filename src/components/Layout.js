import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import api from "../axios/axiostest";

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await api.get("/api/auth/check-session",{withCredentials:true});
                console.log("check: "+response.data)
                setIsLoggedIn(response.data); // Sprawdź, czy sesja jest aktywna
            } catch (err) {
                console.error("Error checking session:", err);
                setIsLoggedIn(false);
            }
        };

        checkSession();
    }, []);

    const logout = async () => {
        try {
            // Wywołanie API do wylogowania
            const response = await api.get("/logout", { withCredentials: true });
            console.log("logout:"+response.data)
            // Ustawienie stanu na false po wylogowaniu
            setIsLoggedIn(false);
        } catch (err) {
            console.error("Error Logging Out:", err);
        }
    };

    return (
        <main>
            <Navbar bg="dark" variant="dark" >
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">MoViezard</Navbar.Brand>

                    <Nav className="d-flex align-items-center" >
                        {isLoggedIn ? (
                            <>
                                <Button as={NavLink} to="/profile" variant="outline-info" className="me-2">
                                    Profile
                                </Button>
                                
                                <Button onClick={logout} variant="outline-info" className="me-2">
                                    Logout
                                </Button>
                            </>
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
