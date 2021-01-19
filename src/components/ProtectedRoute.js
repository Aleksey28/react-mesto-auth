import { Redirect, Route } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, ...props }) => {
  console.log(props.loggedIn);
  return (
    <Route>
      {
        () => props.loggedIn ? children : <Redirect to="/sign-in"/>
      }
    </Route>
  );
};

export default ProtectedRoute;
