import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

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
      <button
        onClick={() => {
          const idx: any = tracks?.findIndex((x) => x.id === track.id);
          setQueue(tracks);
          setCurrentTrack(tracks?.[idx]);
          setIsPlaying(true);
        }}
      >
        Play
      </button>
    );
  };

  const ButtonPause: React.FC = () => {
    return (
      <button
        onClick={() => {
          const idx: any = tracks?.findIndex((x) => x.id === track.id);
          setCurrentTrack(tracks?.[idx]);
          setIsPlaying(false);
        }}
      >
        Pause
      </button>
    );
  };

  const isCurrent = (track: ITrack) => {
    return track.id === currentTrack?.id;
  };

  const [button, setButton] = useState(<ButtonPlay />);
  return <>{button}</>;
};
