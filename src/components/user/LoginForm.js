import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import User from "../api/User";

const LoginForm = ({ isLogin, setIsLogin, redirect }) => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add code here to submit the form data to your API or database

    if (!username || !password) {
      setErrorMessage("username or password must not blank");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("password must be at least 8 characters");
      return;
    }

    const formData = { username, password };

    console.log("Data send: ", formData);

    try {
      const data = await User.login(formData);
      console.log("Data received: ", data);
      localStorage.setItem("token", data.access_token);
      setIsLogin(true);
    } catch (error) {
      console.log({ error: error.message });
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {isLogin && <Redirect to={redirect} />}
      <Container>
        <h1 className="text-center mt-5 mb-3">Login</h1>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            {errorMessage && (
              <span className="ms-3 text-danger">{errorMessage}</span>
            )}
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="d-flex">
            <Button type="submit">Login</Button>
            <span className="ms-auto">
              <span>Not Registered yet?</span>
              <Link className="btn btn-secondary ms-2" to="/register">
                Register
              </Link>
            </span>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
