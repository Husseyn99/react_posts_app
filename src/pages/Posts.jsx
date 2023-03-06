import { useEffect, useRef, useState } from "react";

import { useSortedAndSearchedPosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";

import { pageCount } from "../utils/pages";

import PostList from "../components/posts/PostList";
import PostForm from "../components/posts/PostForm";
import PostFilter from "../components/posts/PostFilter";

import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/Pagination/Pagination";
import Select from "../components/UI/Select/Select";

import PostService from "../API/PostService";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const sortedAndSearchedPosts = useSortedAndSearchedPosts(
    posts,
    filter.sort,
    filter.query
  );
  const [fetchPosts, isPostsLoading, error] = useFetching(async () => {
    const res = await PostService.getAll(limit, page);
    setTotalPages(pageCount(res.headers["x-total-count"], limit));
    setPosts([...posts, ...res.data]);
  });

  useObserver(lastElement, page < totalPage, isPostsLoading, () => {
    setPage(page + 1);
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
  }, [page, limit]);

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
      <Select
        option={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 15, name: "15" },
          { value: -1, name: "Показать все" },
        ]}
        defaultValue={"Количество постов на странице"}
        value={limit}
        onChange={(value) => {
          setLimit(value);
        }}
      />
      {error && <h1>Произошла ошибка {error}</h1>}
      <PostList
        deletePost={deletePost}
        posts={sortedAndSearchedPosts}
        title="Посты про Js"
      />
      <div ref={lastElement} style={{ height: 20 }}></div>
      {isPostsLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}

      <Pagination totalPage={totalPage} page={page} setPage={setPage} />
    </div>
  );
}

export default Posts;
