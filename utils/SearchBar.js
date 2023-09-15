import React, { memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./CustomFunction";
const SearchBar = ({ setQuery, query }) => {
  const handleSearch = ({ currentTarget = [] }) => {
    setQuery(currentTarget.value);
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        type="text"
        value={query}
        onChange={handleSearch}
      />
    </Search>
  );
};

export default memo(SearchBar);
