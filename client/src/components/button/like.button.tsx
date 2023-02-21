import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  createFavoriteTrackAsync,
  removeFavoriteTrackAsync,
} from "../../requests/requests.favorite";
import { useActions } from "../../hooks/useActions";
import { ITrack } from "../../types/track";
import favoriteOnIcon from "../../assets/player/favorite_on-icon.svg";
import favoriteIcon from "../../assets/player/favorite-icon.svg";
import "../player/player.css";

type Props = {
  isForTrack: boolean;
  track: ITrack;
};
export const LikeButton: React.FC<Props> = ({ isForTrack, track }) => {
  const { favorites, user, token, isAuth } = useTypedSelector(
    (state) => state.user
  );
  const { fetchUserFavorites } = useActions();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    if (isForTrack && favorites) {
      const favorite = favorites.find((f) => f.id === track?.id);
      if (favorite) {
        setIsFavorite(true);
        setFavoriteId(favorite.favorite_id);
      } else setIsFavorite(false);
    }
  }, [favorites, track]);

  const unlikeButtonHandler = () => {
    likeAccess();
    if (isForTrack && token && favoriteId && user) {
      removeFavoriteTrackAsync(token, favoriteId).then((response) => {
        fetchUserFavorites(user.id);
        setIsFavorite(false);
      });
    }
  };

  const likeButtonHandler = () => {
    likeAccess();
    if (isForTrack && token && track && user) {
      createFavoriteTrackAsync(token, track.id).then((response) => {
        fetchUserFavorites(user.id);
        setIsFavorite(true);
      });
    }
  };

  const likeAccess = () => {
    if (!isAuth) {
      window.location.replace(window.location.origin + "/sign-in");
    }
  };

  return (
    <>
      {isFavorite && (
        <img
          src={favoriteOnIcon}
          className={"btn_action like"}
          onClick={unlikeButtonHandler}
        />
      )}
      {!isFavorite && (
        <img
          src={favoriteIcon}
          className={"btn_action like"}
          onClick={likeButtonHandler}
        />
      )}
    </>
  );
};
