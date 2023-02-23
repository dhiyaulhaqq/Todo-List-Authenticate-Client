import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { useHistory, NavLink, Link } from "react-router-dom";

import "./Header.css";

export default function Header({ isLogin, setIsLogin }) {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    history.push("/");
  };

  return (
    <>
      <Navbar>
        <Link to="/" className="me-auto navbar-brand">
          TodoApp
        </Link>
        <Nav>
          {!isLogin && (
            <NavItem>
              <NavLink to={"/login"} className="nav-link">
                Login
              </NavLink>
            </NavItem>
          )}
          {!isLogin && (
            <NavItem>
              <NavLink to={"/register"} className="nav-link">
                Register
              </NavLink>
            </NavItem>
          )}
          {isLogin && (
            <NavItem>
              <NavLink to={"/todo"} className="nav-link">
                Todo
              </NavLink>
            </NavItem>
          )}
          {isLogin && (
            <NavItem>
              <button onClick={logout} className="btn nav-link">
                Logout
              </button>
            </NavItem>
          )}
        </Nav>
      </Navbar>
    </>
  );
}
