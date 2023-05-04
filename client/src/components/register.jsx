import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import "./global.css";
import { Button, Link } from "@material-ui/core";
import axios from "axios"

const Register = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          name:name,
          email: email,
          password: password,
        };
    
        axios.post("https://eternalight-infotech-assignment.onrender.com/register", user)
          .then((response) => {
            console.log(response);
            window.alert("User Register Successfully")
            navigate("/")
          })
          .catch((error) => {
            if(error.response.status===400){
                window.alert("All Fields are Required")
            }
            if(error.response.status===422){
                window.alert("User is already exists Please go to Login")
                navigate("/SignIn")
            }
            else{
                console.log();
                window.alert("Invalid Crediantials")
                console.error(error);
            }
            
          });
      };

  return (
    <div className="Login_container">
      <form className="Login_form" onSubmit={handleSubmit}>
        <h2>SignUp Page</h2>
        <TextField
          id="standard-basic"
          variant="outlined"
          label="Name"
          type="text"
          size="small"
          value={name}
          onChange={(e)=>setName(e.target.value)}
                />

        <TextField
          id="standard-basic"
          variant="outlined"
          label="Email"
          type="email"
          size="small"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        
        />
        <TextField
          id="standard-basic"
          variant="outlined"
          label="Password"
          type="password"
          size="small"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
                />
        <div className="Login_Link">
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/Signin");
          }}
        >
        already Register Login
        </Link>

        </div>
        

        <Button variant="outlined" color="primary" type="submit" >
          SignUp
        </Button>
      </form>
    </div>
  );
};

export default Register;