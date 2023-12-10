import React from "react";
import { ITrack } from "../../../types/track";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import pauseIcon from "../../../assets/player/pause-icon.svg";

type Props = {
  track: ITrack;
};
export const PauseButtonView: React.FC<Props> = ({ track }) => {
  const { setIsPlaying, setCurrentTrack } = useActions();
  const { tracks } = useTypedSelector((state) => state.track);
  return (
    <button>
      <img
        alt={"pause"}
        src={pauseIcon}
        className={"btn_action"}
        onClick={() => {
          const idx = tracks?.findIndex((x) => x.id === track.id);
          if (!idx && idx !== 0) return;
          setCurrentTrack(tracks?.[idx] ? tracks?.[idx] : null);
          setIsPlaying(false);
        }}
      />
    </button>
  );
};
