import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);

  const sendRequest = async (type) => {
      const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
      if(res?.data){
        const data = await res?.data;
        return data;
      }else{
        throw new Error("Your custom error message here.");
      }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = isSignup ? "signup" : "login";

    try {
      const data = await sendRequest(type);
      localStorage.setItem("userId", data.user._id); // Or console.log for mock
      console.log("User ID stored:", data.user._id);
      dispatch(authActions.login());
      navigate("/blogs");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `An error occurred during ${type}. Please try again.`;
      console.error(`${type} failed:`, err);
      alert(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
