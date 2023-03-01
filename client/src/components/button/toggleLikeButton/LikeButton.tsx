import { createFavoriteTrackAsync } from "../../../helpers/requests/requests.favorite";
import React from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import favoriteIcon from "../../../assets/player/favorite-icon.svg";
import { ITrack } from "../../../types/track";
import { authGuard } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonType: string;
  onToggle: () => void;
  track: ITrack;
};
export const LikeButton: React.FC<Props> = ({ onToggle, track }) => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  const handlerClick = async () => {
    authGuard(isAuth, navigate);

    if (!(track && user)) {
      return;
    }

    try {
      await createFavoriteTrackAsync(track.id);
      onToggle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button>
      <img
        src={favoriteIcon}
        className={"btn_action like"}
        onClick={handlerClick}
        alt={"unlike"}
      />
    </button>
  );
};
