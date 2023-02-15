import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { TrackItem } from "../components/track/track.item";

export const HomePage: React.FC = () => {
  const { popularTracks } = useTypedSelector((state) => state.track);
  const { fetchPopularTracks } = useActions();
  useEffect(() => {
    fetchPopularTracks();
  }, []);
  return (
    <div>
      <div>HomePage</div>
      {popularTracks &&
        popularTracks.map((track) => {
          return (
            <TrackItem track={track} tracks={popularTracks} key={track.id} />
          );
        })}
    </div>
  );
};
