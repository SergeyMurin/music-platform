import favoriteOnIcon from "../../../assets/player/favorite_on-icon.svg";
import React from "react";
import { removeFavoriteTrackAsync } from "../../../helpers/requests/requests.favorite";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { authGuard } from "../../../helpers/helpers";

type Props = {
  favoriteId: string;
  buttonType: string;
  onToggle: () => void;
};
export const UnlikeButton: React.FC<Props> = ({ favoriteId, onToggle }) => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const handlerUnlikeButtonAsync = async () => {
    if (!(favoriteId && user)) {
      return;
    }
    authGuard(isAuth);

    try {
      await removeFavoriteTrackAsync(favoriteId);
      onToggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button>
      <img
        src={favoriteOnIcon}
        className={"btn_action like"}
        onClick={handlerUnlikeButtonAsync}
        alt={"unlike"}
      />
    </button>
  );
};
