import React from "react";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <Input
        placeholder="Поиск..."
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        value={filter.query}
      />
      <Select
        value={filter.sort}
        option={[
          { value: "title", name: "По названию" },
          { value: "body", name: "По описанию" },
        ]}
        defaultValue="Сортировка"
        onChange={(selectSorted) => setFilter({...filter, sort: selectSorted})}
      />
    </div>
  );
};

export default PostFilter;
