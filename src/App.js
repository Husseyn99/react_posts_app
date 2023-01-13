import { useEffect, useState } from "react";

import { useSortedAndSearchedPosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";

import Modal from "./components/UI/Modal/Modal";
import Button from "./components/UI/Button/Button";
import Loader from "./components/UI/Loader/Loader";

import PostService from "./API/PostService";

import PostList from "./components/posts/PostList";
import PostForm from "./components/posts/PostForm";
import PostFilter from "./components/posts/PostFilter";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = useSortedAndSearchedPosts(
    posts,
    filter.sort,
    filter.query
  );
  const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
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
  }, []);
 
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
    </div>
  );
}

export default App;
