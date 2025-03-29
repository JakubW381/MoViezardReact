import React, { useState } from "react";
import { Button } from "react-bootstrap";
import api from "../../axios/axiostest";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SendPost = async (username, password,navigate) => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post("/login", formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });

    console.log(response.status);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

const continueWithGoogle  = (navigate) =>{
  try{
    const response = api.get("/oauth2/authorization/google",{withCredentials : true});
    console.log(response.data);
    navigate("/");
  }catch(err){
      console.log(err);
  }
}


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    SendPost(username, password,navigate);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
          <label>Enter username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        
          <label>Enter password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassChange}
          />
        {/* <Button onClick={continueWithGoogle(navigate)}>Continue With Google</Button> */}
        <Button className="button" type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
