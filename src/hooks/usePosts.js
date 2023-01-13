import { useMemo } from "react";

export const useSortedPost = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    } else {
      return posts;
    }
  }, [posts, sort]);

  return sortedPosts;
};

export const useSortedAndSearchedPosts = (posts, sort, query) => {
  const sortedPosts = useSortedPost(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((posts) =>
      posts.title.toLocaleLowerCase().includes(query)
    );
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
};
