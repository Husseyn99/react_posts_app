import { useMemo } from "react";

export const usePagination = (pageCount) => {
  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < pageCount; i++) {
      arr.push(i + 1);
    }
    return arr;
  }, [pageCount]);

  return pages;
};
