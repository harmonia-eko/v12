import React from "react";


const SearchItem = ({ showSearchForm }) => {

  return (
    <li className="search">
      <a href="!#" id="search-button" onClick={showSearchForm}>
        <i class="icofont-search-1"></i>
      </a>
    </li>
  );
};

export default SearchItem;
