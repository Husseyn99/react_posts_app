import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button/Button";

import style from "./PostItem.module.css";

const PostItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className={style.post}>
      <div className={style.content}>
        <h3>
          {props.id}. {props.post.title}
        </h3>
        <span>{props.post.body}</span>
      </div>
      <Button onClick={() => navigate("/posts/" + props.id)}>Открыть</Button>
      <Button onClick={() => props.deletePost(props.post)}>Удалить</Button>
    </div>
  );
};

export default PostItem;
