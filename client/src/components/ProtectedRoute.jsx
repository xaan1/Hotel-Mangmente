import { AppContext } from "../context/AppContex";
import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(AppContext);

 
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  console.log(userData.isAdmin, "userData");

  // Haddii user-ku uusan ahayn admin, dib ugu dir bogga ugu weyn (ama bog kale)


  if (userData.isAdmin) {
    return  <Navigate to="/admin" replace />;
  }

  // Haddii user-ku yahay admin, sii muji bogga la rabo
  return <>{children}</>;



};

export default ProtectedRoute;
