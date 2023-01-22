import { useEffect, useState } from "react";

import { useSortedAndSearchedPosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";

import { pageCount } from "./utils/pages";

import PostList from "./components/posts/PostList";
import PostForm from "./components/posts/PostForm";
import PostFilter from "./components/posts/PostFilter";

import Modal from "./components/UI/Modal/Modal";
import Button from "./components/UI/Button/Button";
import Loader from "./components/UI/Loader/Loader";
import Pagination from "./components/UI/Pagination/Pagination";

import PostService from "./API/PostService";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = useSortedAndSearchedPosts(
    posts,
    filter.sort,
    filter.query
  );
  const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
    const posts = await PostService.getAll(limit, page);
    setTotalPages(pageCount(posts.headers["x-total-count"], limit));
    setPosts(posts.data);
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const deletePost = (post) => {
    setPosts(posts.filter((el) => el.id !== post.id));
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div style={{ width: "41%" }}>
      <Button style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>

      <hr style={{ margin: "10px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {error && <h1>Произошла ошибка {error}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          deletePost={deletePost}
          posts={sortedAndSearchedPosts}
          title="Посты про Js"
        />
      )}
      <Pagination totalPage={totalPage} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
