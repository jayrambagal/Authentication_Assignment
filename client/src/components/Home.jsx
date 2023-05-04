import React, { useEffect, useState } from "react";
import "./global.css";
import { Button, TextField } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      console.log(response);
      console.log(response.data[0].email);
      setUser(response.data);
      setName(response.data[0].name);
      setEmail(response.data[0].email);
      setPassword(response.data[0].password);
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedUser = { name, email, password };
    await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
    window.alert("User updated successfully!");
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmation) {
      await axios.delete(`/users/${id}`);
      alert("User deleted successfully!");
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
       // Assumes that your frontend and backend are running on the same host
        window.confirm("are you sure to Logout")
        navigate("/")
      // Clear the user data from localStorage or session storage if necessary
      // Redirect the user to the login page or homepage
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="Login_container">
      <form className="Home_form" onSubmit={handleUpdate}>
        <h2>User Profile</h2>
            <img className="profile_logo" src="https://avatars.githubusercontent.com/u/94613732?s=400&u=947fb334137ba0589041f709277fd665effe45a9&v=4" alt=""/>
        <div className="home_input">
          <h3>Name :</h3>
          <TextField
            id="standard-basic"
            variant="outlined"
            label=""
            type="text"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="home_input">
          <h3>Email :</h3>
          <TextField
            id="standard-basic"
            variant="outlined"
            label=""
            type="email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>


        <Button variant="outlined" color="primary" type="submit">
          update
        </Button>

        <Button variant="outlined" color="primary" onClick={logoutUser} >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Home;
