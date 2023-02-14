import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: any) => {
    event.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
