import React from "react";
import { useActions } from "../../../hooks/useActions";
import { ITrack } from "../../../types/track";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import playIcon from "../../../assets/player/play-icon.svg";

type Props = {
  track: ITrack;
};
export const PlayButtonView: React.FC<Props> = ({ track }) => {
  const { setIsPlaying, setQueue, setCurrentTrack } = useActions();
  const { tracks } = useTypedSelector((state) => state.track);

  const handlerClick = () => {
    const idx = tracks?.findIndex((x) => x.id === track.id);
    if (!idx && idx !== 0) return;
    setQueue(tracks);
    setCurrentTrack(tracks?.[idx] ? tracks?.[idx] : null);
    setIsPlaying(true);
  };

  return (
    <button>
      <img
        alt={"play"}
        src={playIcon}
        className={"btn_action"}
        onClick={handlerClick}
      />
    </button>
  );
};
