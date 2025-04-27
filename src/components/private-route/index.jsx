import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/sign-in"} replace />;
  }
  return (
    <>
      <Outlet />;
    </>
  );
};

export default PrivateRoute;
