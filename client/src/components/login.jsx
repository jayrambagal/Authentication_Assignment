import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./global.css";
import { Button, Link } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          email: email,
          password: password,
        };
    
        axios.post("http://localhost:5000/login", user)
          .then((response) => {
            console.log(response);
            console.log("User logged in successfully");
            window.alert("Login successfully")
            navigate(`/users/${response.data._id}`)
          })
          .catch((error) => {
            if(error.response.status === 404){
                window.alert("Email not found Please SignUp")
            }else if(error.response.status === 400){
                window.alert("Password is Incorrect")
            }else{
                console.error(error);
                window.alert("Failed to login")
            }
            
          });
      };

  return (
    <div className="Login_container">
      <form className="Login_form" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <TextField
          id="standard-basic"
          variant="outlined"
          label="Email"
          type="email"
          size="small"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        
        />
        <TextField
          id="standard-basic"
          variant="outlined"
          label="Password"
          type="password"
          size="small"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
                />
        <div className="Login_Link">
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/SignUp");
          }}
        >
          don't have account? Register
        </Link>

        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/reset")
          }}
        >
          Forgot Password
        </Link>
        </div>
        

        <Button variant="outlined" color="primary" type="submit" >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
