import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function MainLayout({ children }) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa khi load trang
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);

      // Lấy thông tin người dùng từ local storage và cập nhật state
      const userData = JSON.parse(user);
      setUsername(userData.username);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9999/user/logout");

      // Xóa token hoặc phiên đăng nhập từ local storage hoặc cookies (nếu cần)
      console.log("Logout successful");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar bg="body-tertiary" expand="lg" className="mb-3">
        <Navbar.Brand>FilmFusion Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <NavLink onClick={() => nav(`/`)}>Home</NavLink>
          </Nav>
          {isLoggedIn ? (
            <>
              <p className="m-2">Hello,{username}</p>
              <Button
                variant="secondary"
                className="me-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => nav(`/login`)}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => nav(`/register`)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>

      {children}
    </>
  );
}
export default MainLayout;
