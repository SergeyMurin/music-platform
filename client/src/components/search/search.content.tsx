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
        setTracks(response.data.tracks);
        setSearchResults(response.data);
      });
  };

  return (
    <>
      {searchResults &&
        tracks &&
        tracks.map((track) => {
          return <TrackItem track={track} key={track.id} tracks={tracks} />;
        })}
    </>
  );
};
