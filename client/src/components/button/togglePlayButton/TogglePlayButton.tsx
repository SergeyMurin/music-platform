import React, { useEffect, useState } from "react";
import { ITrack } from "../../../types/track";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import "../../player/player.css";
import { PauseButtonView } from "./PauseButtonView";
import { PlayButtonView } from "./PlayButtonView";

type Props = {
  track: ITrack;
};
export const TogglePlayButton: React.FC<Props> = ({ track }) => {
  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
  const [toggle, setToggle] = useState(false);

  const playingEffect = () => {
    if (currentTrack?.id === track.id) {
      setToggle(isPlaying);
    } else {
      setToggle(false);
    }

    /*if (currentTrack?.id === track.id) {
              setToggle(true);
            }
            if (currentTrack?.id !== track.id) {
              setToggle(false);
            }
            if (currentTrack?.id !== track.id && isPlaying) {
              setToggle(false);
            }
            if (currentTrack?.id === track.id && !isPlaying) {
              setToggle(false);
            }*/
  };

  useEffect(playingEffect, [currentTrack, isPlaying]);

  return (
    <>
      {toggle ? (
        <PauseButtonView track={track} />
      ) : (
        <PlayButtonView track={track} />
      )}
    </>
  );
};
