import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { ITrack } from "../../../types/track";
import "../../player/player.css";
import { UnlikeButtonView } from "./UnlikeButtonView";
import { LikeButtonView } from "./LikeButtonView";

enum BUTTON_PURPOSES {
  TRACK = "TRACK",
  ALBUM = "ALBUM",
  PLAYLIST = "PLAYLIST",
}

type Props = {
  track: ITrack;
};

export const ToggleLikeButton: React.FC<Props> = ({ track }) => {
  const { favorites, user } = useTypedSelector((state) => state.user);
  const { fetchUserFavorites } = useActions();

  const [toggle, setToggle] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  const effectFavorites = () => {
    if (!favorites) {
      return;
    }
    const favorite = favorites.find((f) => f.id === track?.id);
    if (favorite) {
      setToggle(true);
      setFavoriteId(favorite.favorite_id);
    } else setToggle(false);
  };

  useEffect(effectFavorites, [favorites, track]);

  const handlerToggle = () => {
    if (!user) {
      return;
    }
    fetchUserFavorites(user.id);
  };

  return (
    <>
      {toggle && favoriteId && (
        <UnlikeButtonView
          favoriteId={favoriteId}
          buttonPurpose={BUTTON_PURPOSES.TRACK}
          onToggle={handlerToggle}
        />
      )}
      {!toggle && (
        <LikeButtonView
          buttonPurpose={BUTTON_PURPOSES.TRACK}
          onToggle={handlerToggle}
          track={track}
        />
      )}
    </>
  );
};
