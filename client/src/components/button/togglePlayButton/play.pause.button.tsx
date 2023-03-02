import React, { useEffect, useState } from "react";
import { ITrack } from "../../../types/track";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import pauseIcon from "../../../assets/player/pause-icon.svg";
import playIcon from "../../../assets/player/play-icon.svg";
import "../../player/player.css";

type Props = {
  track: ITrack;
};
export const PlayPauseButton: React.FC<Props> = ({ track }) => {
  const { tracks } = useTypedSelector((state) => state.track);
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { setIsPlaying, setQueue, setCurrentTrack } = useActions();
  useEffect(() => {
    if (currentTrack?.id === track.id) {
      setButton(<ButtonPause />);
    }
    if (currentTrack?.id !== track.id) {
      setButton(<ButtonPlay />);
    }
    if (currentTrack?.id !== track.id && isPlaying) {
      setButton(<ButtonPlay />);
    }
    if (currentTrack?.id === track.id && !isPlaying) {
      setButton(<ButtonPlay />);
    }
  }, [currentTrack, isPlaying]);

  const ButtonPlay: React.FC = () => {
    return (
      <img
        alt={"play"}
        src={playIcon}
        className={"btn_action"}
        onClick={() => {
          const idx: any = tracks?.findIndex((x) => x.id === track.id);
          setQueue(tracks);
          setCurrentTrack(tracks?.[idx]);
          setIsPlaying(true);
        }}
      />
    );
  };

  const ButtonPause: React.FC = () => {
    return (
      <img
        alt={"pause"}
        src={pauseIcon}
        className={"btn_action"}
        onClick={() => {
          const idx: any = tracks?.findIndex((x) => x.id === track.id);
          setCurrentTrack(tracks?.[idx]);
          setIsPlaying(false);
        }}
      />
    );
  };

  const isCurrent = (track: ITrack) => {
    return track.id === currentTrack?.id;
  };

  const [button, setButton] = useState(<ButtonPlay />);
  return <>{button}</>;
};
