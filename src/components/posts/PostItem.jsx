import React from "react";

import Button from "../UI/Button/Button";

import style from "./PostItem.module.css";

const PostItem = (props) => {
  return (
    <div className={style.post}>
      <div className={style.content}>
        <h3>
          {props.number}. {props.post.title}
        </h3>
        <span>{props.post.body}</span>
      </div>
      <Button onClick={() => props.deletePost(props.post)}>Удалить</Button>
    </div>
  );
};

export default PostItem;
