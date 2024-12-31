import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Authentication from "./components/Authentication/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";

export default function App() {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfile(jwt));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [auth.jwt]);

  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route
        path="/*"
        element={auth.user ? <HomePage /> : <Authentication />}
      />
    </Routes>
  );
}
