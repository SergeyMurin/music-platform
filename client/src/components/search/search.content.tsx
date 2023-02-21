import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TrackItem } from "../track/track.item";
import { Loader } from "../loader/loader";
import { UserItem } from "../user/user.item";
import { IUser } from "../../types/user";
import { getSearchAll } from "../../requests/request.search";

export const SearchContent: React.FC = () => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showTracksAll, setShowTracksAll] = useState(false);
  const [showUsersAll, setShowUsersAll] = useState(false);
  const params = new URLSearchParams(location.search);

  const displayedCount = 3;

  //const [albums, setAlbums] = useState();
  const [users, setUsers] = useState<IUser[]>();

  useEffect(() => {
    const query = params.get("q");
    if (!query) return;

    setIsLoading(true);
    fetchSearch(query).then(() => {
      setIsLoading(false);
    });
  }, [location.search]);

  const fetchSearch = async (query: string) => {
    await getSearchAll(query).then((response) => {
      setTracks(response.data.tracks);
      setUsers(response.data.users);
      setSearchResults(response.data);
    });
  };

  const handleShowTracksAll = () => {
    setShowTracksAll(!showTracksAll);
  };

  const handleShowUsersAll = () => {
    setShowUsersAll(!showUsersAll);
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
          {/*Tracks*/}

          <h1>Soundtracks</h1>

          {!tracks?.length && <h2>No matches</h2>}
          {!showTracksAll && tracks && tracks.length > displayedCount && (
            <button onClick={handleShowTracksAll}>Show All</button>
          )}
          {showTracksAll && tracks && tracks.length > displayedCount && (
            <button onClick={handleShowTracksAll}>Hide</button>
          )}
          {tracks &&
            tracks
              .slice(0, showTracksAll ? tracks.length : displayedCount)
              .map((track) => {
                return (
                  <TrackItem track={track} key={track.id} tracks={tracks} />
                );
              })}

          {/*Users*/}
          <hr />
          <h1>Users</h1>

          {!users?.length && <h2>No matches</h2>}
          {!showUsersAll && users && users.length > displayedCount && (
            <button onClick={handleShowUsersAll}>Show All</button>
          )}
          {showUsersAll && users && users.length > displayedCount && (
            <button onClick={handleShowUsersAll}>Hide</button>
          )}
          {users &&
            users
              .slice(0, showUsersAll ? users.length : displayedCount)
              .map((user) => {
                return <UserItem user={user} key={user.id} />;
              })}
        </>
      )}
    </>
  );
};
