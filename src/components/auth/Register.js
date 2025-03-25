import React, { useState } from "react";
import api from "../../axios/axiostest";
import { Button, Alert } from "react-bootstrap";
import "./Register.css"

const SendPost = async (username, email, password, setAlert, setShow) => {
    try {
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        });

        setAlert("Rejestracja zakończona sukcesem!");
        setShow(true);
    } catch (err) {
        setAlert("Błąd: " + (err.response?.data?.message || "Nieznany błąd"));
        setShow(true);
    }
};

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, email, password } = formData;
        if (!username || !email || !password) {
            setAlert("Wszystkie pola muszą być wypełnione!");
            setShow(true);
            return;
        }
        if (password.length < 8){
            setAlert("Hasło jest zbyt krótkie");
            setShow(true);
            return;
        }

        await SendPost(username, email, password, setAlert, setShow);
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />

                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                    />

                    <Button className="submit" type="submit">Zarejestruj</Button>
                </form>
                {show && (
                    <Alert className="alert" key="danger" variant="danger" onClose={() => setShow(false)} dismissible>
                        {alert}
                    </Alert>
                )}
            </div>

            <div className="checks-container">
                <ul>
                    <li>Hasło musi mieć co najmniej 8 znaków</li>
                    <li>Email musi być w poprawnym formacie</li>
                </ul>
            </div>
        </div>
    );
};

export default Register;