import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
} from "reactstrap";
import RegisterForm from "./user/RegisterForm";
import LoginForm from "./user/LoginForm";
import Authorize from "./user/Authorize";
import Logout from "./user/Logout";

export default function User() {
  const [activeTab, setActiveTab] = useState("register");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={activeTab === "register"}
                    onClick={() => {
                      toggle("register");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "login"}
                    onClick={() => {
                      toggle("login");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={activeTab === "authorize"}
                    onClick={() => {
                      toggle("authorize");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Authorize
                  </NavLink>
                </NavItem>
              </Nav>
              <CardBody>
                {activeTab === "register" ? (
                  <RegisterForm />
                ) : activeTab === "login" ? (
                  <LoginForm />
                ) : (
                  <>
                    <Authorize />
                    <Logout />
                  </>
                )}
              </CardBody>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
