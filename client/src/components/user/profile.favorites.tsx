import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TrackItem } from "../track/track.item";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

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
  const getFavoritesAsync = async (id: string) => {
    return await axios.get("http://localhost:5000/favorite/all", {
      params: { id },
    });
  };
  return (
    <div className={"favorites"}>
      {favorites &&
        tracks &&
        favorites.map((f: ITrack) => {
          return <TrackItem key={f.id} track={f} tracks={tracks} />;
        })}
    </div>
  );
};
