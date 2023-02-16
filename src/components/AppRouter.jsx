import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Posts from "../pages/Posts";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/posts" element={<Posts />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
