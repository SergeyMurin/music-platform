import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const SearchContent: React.FC = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (!query) return;

    fetchSearch(query).then();
  }, [location.search]);

  const fetchSearch = async (query: string) => {
    await axios
      .get(`http://localhost:5000/user/search?term=${query}&type=all`)
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      });
  };

  return <></>;
};
