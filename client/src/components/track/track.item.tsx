import React, { useEffect, useState } from "react";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { BiUnderline } from "react-icons/all";

type Props = {
  track: ITrack;
  tracks: ITrack[];
};

export const TrackItem: React.FC<Props> = ({ track, tracks }) => {
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const { setCurrentTrack, setIsPlaying, setQueue } = useActions();

  useEffect(() => {
    if (currentTrack.id === track.id) {
      setButton(<ButtonPause />);
    }
    if (currentTrack.id !== track.id) {
      setButton(<ButtonPlay />);
    }
    if (currentTrack.id !== track.id && isPlaying) {
      setButton(<ButtonPlay />);
    }
    if (currentTrack.id === track.id && !isPlaying) {
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
          const idx = tracks?.findIndex((x) => x.id === track.id);
          setCurrentTrack(tracks[idx]);
          setIsPlaying(false);
        }}
      >
        Pause
      </button>
    );
  };

  const [button, setButton] = useState(<ButtonPlay />);

  return (
    <div className={"track-item"} key={track.id}>
      <span>{track.id}</span>
      <span>{track.title}</span>

      {button}
    </div>
  );
};

//когда current id === track id и isPlaying отображает pause,
