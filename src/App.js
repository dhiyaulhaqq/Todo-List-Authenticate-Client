import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import TodoApp from "./components/TodoApp";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/user/LoginForm";
import Register from "./components/user/RegisterForm";
import User from "./components/api/User";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  console.log({ isLogin });

  useEffect(() => {
    async function fetchData() {
      const data = await User.checkLogin();
      if (data.status === "error") {
        localStorage.removeItem("token");
        setIsLogin(false);
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLogin(true);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              redirect="/todo"
            />
          </Route>
          <Route path="/login">
            <Login isLogin={isLogin} setIsLogin={setIsLogin} redirect="/todo" />
          </Route>
          <Route path="/todo">
            {isLogin ? <TodoApp /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Container>
      <h1 className="text-center my-5">Home</h1>
    </Container>
  );
}

export default App;
