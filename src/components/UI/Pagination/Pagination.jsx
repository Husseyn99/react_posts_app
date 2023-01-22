import React from "react";

import { usePagination } from "../../../hooks/usePagination";

const Pagination = ({ page, setPage, totalPage }) => {
  const pagesArray = usePagination(totalPage);
  return (
    <div>
      {pagesArray.map((p) => {
        return (
          <button
            key={p}
            className={
              page === p ? "page__button page__current" : "page__button"
            }
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
