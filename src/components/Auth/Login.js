import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login({ setIsLoggedIn }) {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi request đến API Backend
      const response = await axios.post("http://localhost:9999/user/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setIsLoggedIn(true);
      nav("/");

      // Hiển thị thông báo khi đăng nhập thành công
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("Login failed:", error.toString());
      }

      // Hiển thị thông báo khi đăng nhập thất bại
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className=" login fw-bold mb-2 text-uppercase ">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        size="lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        size="lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <p></p>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <Button
                      variant="outline-light"
                      size="lg"
                      className="px-5"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" className="text-white">
                      <i className="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <a href="/register" className="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
