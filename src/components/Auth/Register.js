import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi request đến API Backend
      const response = await axios.post("http://localhost:9999/user/register", {
        username,
        email,
        password,
      });

      console.log("Register successful:", response.data);
      nav("/login");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Register failed:", error.response.data);

      // Hiển thị thông báo lỗi chi tiết từ phản hồi của máy chủ
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text:
          error.response.data.message ||
          "An error occurred during registration.",
      });
    }
  };

  return (
    <section className="vh-250 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col xs={12} md={8} lg={6} xl={5}>
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your information!
                  </p>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        type="string"
                        placeholder="Username"
                        size="lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

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

                    <Button
                      variant="outline-light"
                      size="lg"
                      className="px-5"
                      type="submit"
                    >
                      Register
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
                    Already have account ?{" "}
                    <a href="/login" className="text-white-50 fw-bold">
                      Login
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

export default Register;
