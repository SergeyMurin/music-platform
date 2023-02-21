import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TrackItem } from "../track/track.item";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { getFavoritesAsync } from "../../requests/requests.favorite";

export const ProfileFavorites: React.FC = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<ITrack[]>();
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();
  useEffect(() => {
    if (id) {
      getFavoritesAsync(id).then((response) => {
        setFavorites(response.data);
        setTracks(response.data);
      });
    }
  }, []);

  return (
    <div className={"favorites"}>
      <h2>Favorites:</h2>
      <hr />
      {favorites &&
        tracks &&
        favorites.map((f: ITrack) => {
          return <TrackItem key={f.id} track={f} tracks={tracks} />;
        })}
    </div>
  );
};
