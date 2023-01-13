import React, { useState } from "react";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: post.title,
      body: post.body,
    };
    create(newPost);
    setPost({ title: "", body: "" });
  };

  return (
    <div>
      <form>
        <Input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название поста"
        />
        <Input
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          type="text"
          placeholder="Описание поста"
        />
        <Button onClick={addNewPost}>Добавить</Button>
      </form>
    </div>
  );
};

export default PostForm;
