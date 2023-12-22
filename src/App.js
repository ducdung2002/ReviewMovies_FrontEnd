import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import Home from "./components/Home/Home.js";
import MovieDetail from "./components/Movie/Detail.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <Outlet />
            </MainLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
        </Route>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
