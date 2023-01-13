import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PostItem from "./PostItem";

const PostList = ({ posts, title, deletePost }) => {
  if (!posts.length) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "15px 0",
        }}
      >
        Нет постов!
      </h1>
    );
  }

  return (
    <div>
      <h1 style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
        {title}
      </h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem number={index + 1} post={post} deletePost={deletePost} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
