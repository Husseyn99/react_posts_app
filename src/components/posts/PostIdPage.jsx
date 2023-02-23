import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
    const post = await PostService.getById(params.id);

    setPost(post.data);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return error && <h1>Произошла ошибка {error}</h1>;
  }

  return (
    <>
      {isPostsLoading ? (
        <Loader />
      ) : (
        <div>
          Пост по ID: {params.id}
          <p>{post.title}</p>
        </div>
      )}
    </>
  );
};

export default PostIdPage;
