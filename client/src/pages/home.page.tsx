import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { TrackItem } from "../components/track/track.item";
import { Loader } from "../components/loader/loader";
import { fetchUserFavorites } from "../store/action.creators/user.actions";

export const HomePage: React.FC = () => {
  const { isAuth, user, token } = useTypedSelector((state) => state.user);
  const { popularTracks } = useTypedSelector((state) => state.track);
  const { fetchPopularTracks, fetchUserFavorites } = useActions();
  useEffect(() => {
    if (user && token) {
      fetchUserFavorites(user.id);
    }
    fetchPopularTracks();
  }, []);

  return (
    <div className={"home-page"}>
      <div className={"page_header"}>Popular Soundtracks</div>
      <hr />
      {!popularTracks?.length && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader />
        </div>
      )}
      {popularTracks &&
        popularTracks.map((track) => {
          return (
            <TrackItem track={track} tracks={popularTracks} key={track.id} />
          );
        })}
    </div>
  );
};
