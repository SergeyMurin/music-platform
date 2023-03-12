import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrackItem } from "../track/TrackItem";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { getFavoritesAsync } from "../../helpers/requests/favoriteRequests";

enum DisplayedText {
  HEADER = "Favorites:",
}

export const ProfileFavorites: React.FC = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState<ITrack[]>();
  const { tracks } = useTypedSelector((state) => state.track);
  const { setTracks } = useActions();

  const profileFavoritesEffect = () => {
    if (!id) return;
    const profileFavoritesEffectAsync = async () => {
      const response = await getFavoritesAsync(id);
      setFavorites(response.data);
      setTracks(response.data);
    };
    profileFavoritesEffectAsync().catch((error) => console.error(error));
  };

  useEffect(profileFavoritesEffect, [id]);

  return (
    <div className={"favorites"}>
      <h2>{DisplayedText.HEADER}</h2>
      <hr />
      {favorites &&
        tracks &&
        favorites.map((f: ITrack) => {
          return <TrackItem key={f.id} track={f} tracks={tracks} />;
        })}
    </div>
  );
};
