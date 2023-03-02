import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "./UI/Loader/Loader";

import { AuthContext } from "../context";

import { publicRoutes, privateRoutes } from "./routes";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuth
        ? privateRoutes.map((route) => (
            <React.Fragment key={route.path}>
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
              <Route path="*" element={<Navigate to="/posts" replace />} />
            </React.Fragment>
          ))
        : publicRoutes.map((route) => (
            <React.Fragment key={route.path}>
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </React.Fragment>
          ))}
    </Routes>
  );
};

export default AppRouter;
