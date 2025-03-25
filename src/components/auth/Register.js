import React from "react";
import api from "../../axios/axiostest";
import { useState } from "react";
import { Button } from "react-bootstrap";

const SendPost = async (username, email, password) => {
    try {
      const response = await api.post("/api/auth/register", {
        username,
        email,
        password
      });
  
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

const Register = () =>{
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        SendPost(username, email, password);
    };

    return (
        <div>
            <h2>You are in registration page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button type="submit">Register</Button>
            </form>

        </div>
    );
};
export default Register;