import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Posts from "../pages/Posts";
import PostIdPage from "./posts/PostIdPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route exact path="/posts" element={<Posts />} />
      <Route exact path="/posts/:id" element={<PostIdPage />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
