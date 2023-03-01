import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
    const post = await PostService.getById(params.id);

    setPost(post.data);
  });

  const [fetchComments, isCommentLoading, commentError] = useFetching(
    async () => {
      const comments = await PostService.getCommentsByPostId(params.id);

      setComments(comments.data);
    }
  );

  useEffect(() => {
    fetchPosts();
    fetchComments();
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
          <h1>Пост по ID: {params.id}</h1>
          <p style={{ fontSize: 20 }}>{post.title}</p>

          <div style={{ marginTop: 50 }}>
            <h1>Комментарии:</h1>
            {isCommentLoading ? (
              <Loader />
            ) : (
              comments.map((comment) => {
                return (
                  <div key={comment.id} style={{ marginTop: 30 }}>
                    <h2>{comment.email}</h2>
                    <p>{comment.body}</p>
                  </div>
                );
              })
            )}
            {commentError && (
              <div>Произошла ошибка при загрузке комментариев</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostIdPage;
