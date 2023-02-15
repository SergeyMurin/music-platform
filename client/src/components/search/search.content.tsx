import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TrackItem } from "../track/track.item";

export const SearchContent: React.FC = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const params = new URLSearchParams(location.search);

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
    setShowAll(true);
  };

  return (
    <>
      <div>Results for "{params.get("q")}"</div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && searchResults && (
        <>
          {tracks &&
            tracks.slice(0, showAll ? tracks.length : 5).map((track) => {
              return <TrackItem track={track} key={track.id} tracks={tracks} />;
            })}
          {!showAll && <button onClick={handleShowAll}>Show All</button>}
        </>
      )}
    </>
  );
};
