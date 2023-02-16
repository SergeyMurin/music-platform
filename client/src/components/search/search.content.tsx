import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TrackItem } from "../track/track.item";
import { Loader } from "../loader/loader";

export const SearchContent: React.FC = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const params = new URLSearchParams(location.search);

  const displayedCount = 3;

  const [albums, setAlbums] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const query = params.get("q");
    if (!query) return;

    setIsLoading(true);
    fetchSearch(query).then(() => {
      setIsLoading(false);
    });
  }, [location.search]);

  const fetchSearch = async (query: string) => {
    await axios
      .get(`http://localhost:5000/user/search?term=${query}&type=all`)
      .then((response) => {
        setTracks(response.data.tracks);
        setSearchResults(response.data);
      });
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div className={"page_header"}>Results for "{params.get("q")}"</div>
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
          <h1>Soundtracks</h1>
          {!tracks?.length && <h2>No matches</h2>}
          {!showAll && tracks && tracks.length > displayedCount && (
            <button onClick={handleShowAll}>Show All</button>
          )}
          {showAll && tracks && tracks.length > displayedCount && (
            <button onClick={handleShowAll}>Hide</button>
          )}
          {tracks &&
            tracks
              .slice(0, showAll ? tracks.length : displayedCount)
              .map((track) => {
                return (
                  <TrackItem track={track} key={track.id} tracks={tracks} />
                );
              })}
        </>
      )}
    </>
  );
};
