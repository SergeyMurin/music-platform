import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  createFavoriteTrackAsync,
  removeFavoriteTrackAsync,
} from "../../requests/favorite";
import { useActions } from "../../hooks/useActions";
import { ITrack } from "../../types/track";

type Props = {
  isForTrack: boolean;
  track: ITrack;
};
export const LikeButton: React.FC<Props> = ({ isForTrack, track }) => {
  const { favorites, user, token } = useTypedSelector((state) => state.user);
  const { fetchUserFavorites } = useActions();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  /*useEffect(() => {
    if (user && token) {
      fetchUserFavorites(user.id, token);
    }
  }, []);*/

  useEffect(() => {
    if (isForTrack && favorites) {
      const favorite = favorites.find((f) => f.track_id === track.id);
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.id);
      } else setIsFavorite(false);
    }
  }, [favorites, track]);

  const unlikeButtonHandler = () => {
    if (isForTrack && token && favoriteId && user) {
      removeFavoriteTrackAsync(token, favoriteId).then((response) => {
        fetchUserFavorites(user.id, token);
        setIsFavorite(false);
      });
    }
  };

  const likeButtonHandler = () => {
    if (isForTrack && token && track && user) {
      createFavoriteTrackAsync(token, track.id).then((response) => {
        fetchUserFavorites(user.id, token);
        setIsFavorite(true);
      });
    }
  };

  return (
    <>
      {isFavorite && <button onClick={unlikeButtonHandler}>Unlike</button>}
      {!isFavorite && <button onClick={likeButtonHandler}>Like</button>}
    </>
  );
};
