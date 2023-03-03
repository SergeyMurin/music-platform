import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { TrackItem } from "../components/track/TrackItem";
import { Loader } from "../components/loader/Loader";

enum displayedText {
  PAGE_HEADER = "Popular Soundtracks",
}

export const HomePage: React.FC = () => {
  const { user, token } = useTypedSelector((state) => state.user);
  const { popularTracks } = useTypedSelector((state) => state.track);
  const { fetchPopularTracks, fetchUserFavorites } = useActions();
  useEffect(() => {
    if (user && token) {
      fetchUserFavorites(user.id);
    }
    fetchPopularTracks();
  }, [token, user]);

  return (
    <div className={"home-page"}>
      <div className={"page_header"}>{displayedText.PAGE_HEADER}</div>
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
