import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Search = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history("/");
    }
  };

  return (
    <form method="post" id="search_form-one" onSubmit={searchHandler}>
      <div class="hero-search-form search-form-style-one">
        <input
          type="text"
          placeholder="Search Your Products..."
          class="search-field"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" class="search-submit" onClick={searchHandler}>
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default Search;
