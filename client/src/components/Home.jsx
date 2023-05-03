import React, { useEffect, useState } from "react";
import "./global.css";
import { Button, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="Login_container">
      <form className="Home_form" onSubmit={handleUpdate}>
        <h2>User Profile</h2>

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

        <div className="home_input">
          <h3>Password :</h3>
          <TextField
            id="standard-basic"
            variant="outlined"
            label=""
            type="text"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="outlined" color="primary" type="submit">
          update
        </Button>
      </form>
    </div>
  );
};

export default Home;
