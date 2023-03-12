import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Loader } from "../loader/Loader";
import { IUser } from "../../types/user";
import { getSearchAllAsync } from "../../helpers/requests/searchRequests";
import { SearchList } from "./SearchList";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

enum DisplayedText {
  TRACKS = "Soundtracks",
  USERS = "Users",
}

enum Search {
  DISPLAYED_COUNT = 3,
  PARAM = "q",
}

export const SearchContent: React.FC = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  const location = useLocation();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(
    new URLSearchParams(location.search).get(Search.PARAM)
  );

  //const [albums, setAlbums] = useState();
  const [users, setUsers] = useState<IUser[]>();

  const searchEffect = () => {
    const fetchSearch = async (query: string) => {
      const response = await getSearchAllAsync(query);
      setTracks(response.data.tracks);
      setUsers(response.data.users);
      setSearchResults(response.data);
      setIsLoading(false);
    };

    const params = new URLSearchParams(location.search);
    const query = params.get(Search.PARAM);
    if (!query) return;

    setSearchTerm(query);

    fetchSearch(query).catch((error) => {
      console.error(error);
      setIsLoading(true);
    });
  };

  useEffect(searchEffect, [location.search]);

  return (
    <>
      <div className={"page_header"}>{`Results for "${searchTerm}"`}</div>
      <hr />
      {isLoading && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader />
        </div>
      )}
      {!isLoading && searchResults && (
        <>
          {/*Tracks*/}
          <h1>{DisplayedText.TRACKS}</h1>
          <SearchList
            list={tracks}
            displayedCount={Search.DISPLAYED_COUNT as number}
          />
          {/*Users*/}
          <hr />
          <h1>{DisplayedText.USERS}</h1>
          <SearchList
            list={users}
            displayedCount={Search.DISPLAYED_COUNT as number}
          />
        </>
      )}
    </>
  );
};
