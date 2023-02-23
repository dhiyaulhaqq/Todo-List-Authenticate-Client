import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import User from "../api/User";

const RegisterForm = ({ isLogin, setIsLogin, redirect }) => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [peek, setPeek] = useState(false);
  const [peekConfirm, setPeekConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePeek = () => {
    setPeek((prevPeek) => !prevPeek);
  };

  const togglePeekConfirm = () => {
    setPeekConfirm((prevPeek) => !prevPeek);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password || !confirmPassword) {
      setErrorMessage("username or password must not blank");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("password must be at least 8 characters");
      return;
    }

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)/;

    if (!regex.test(password)) {
      setErrorMessage(
        "password must at least contain letter [a-z] & number [0-9]"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("password confirmation does not match");
      return;
    }

    try {
      if (password !== confirmPassword)
        throw new Error("password confirmation does not match");

      const formData = { username, password };

      console.log("Data send: ", formData);

      const data = await User.register(formData);
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
        <h1 className="text-center mt-5 mb-3">Register</h1>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            {errorMessage && (
              <span className="ms-3 text-danger">{errorMessage}</span>
            )}
            <InputGroup>
              <Input
                type={peek ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroupText onClick={togglePeek} className="peek">
                {peek ? "Hide" : "Show"}
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <InputGroup>
              <Input
                type={peekConfirm ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputGroupText onClick={togglePeekConfirm} className="peek">
                {peekConfirm ? "Hide" : "Show"}
              </InputGroupText>
            </InputGroup>
          </FormGroup>
          <Button type="submit">Register</Button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterForm;
