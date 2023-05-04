import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useNavigate } from "react-router-dom";
import "./global.css";
import { Button, Link } from "@material-ui/core";
import axios from "axios";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [reset, setReset] = useState(true);

  const SendOtp = async(e)=>{
    e.preventDefault()
    try{
        const res = await fetch('https://eternalight-infotech-assignment.onrender.com/sendmail',{
            method:'POST',
            body:JSON.stringify({ email}),
            headers:{'Content-Type':'application/json'}
          })
          console.log("we are in try block")
        
          const data = await res.json()

          if (res.status===200){
            window.alert("Otp send on mail plz check your mail and reset the password :)")
            setReset(!reset)
          }
          else{
            window.alert("something went wrong")
          }

    }catch(err){
        console.log(err);
    }
}

const ResetPass = async(e)=>{
    e.preventDefault()
    console.log("we are in try block of reset pass")
    try{
        const res = await fetch('https://eternalight-infotech-assignment.onrender.com/changepass',{
            method:'POST',
            body:JSON.stringify({ email,Otp,password}),
            headers:{'Content-Type':'application/json'}
          })
          const data = await res.json()

          if (res.status===200){
            window.alert("reset password successfully :)")
            navigate("/")
          }
          else{
            window.alert("something went wrong")
          }
    }catch(err){
        console.log(err);
    }
}

  return (
    <div className="Login_container">
      <form className="Login_form">
        <h2>Reset Password</h2>
        {reset ? (
          <div className="reset_showemail">
            <h4> Please Enter an Email </h4>
            <TextField
              id="standard-basic"
              variant="outlined"
              label="Email"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="Login_ResetLink">
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go to Login
              </Link>
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={SendOtp}
            >
              Send Otp
            </Button>
          </div>
        ) : (
            
          <div className="reset_otp" >
          <h4>Please Enter valid Opt and New Password </h4>
            <TextField
              id="standard-basic"
              variant="outlined"
              label="Enter an Valid Otp"
              type="text"
              size="small"
              value={Otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <TextField
              id="standard-basic"
              variant="outlined"
              label="New_Password"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="outlined" color="primary" onClick={ResetPass}>
              Change Password
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Reset;
