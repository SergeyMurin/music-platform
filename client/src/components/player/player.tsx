import React, { useEffect, useRef, useState } from "react";
import { PlayerElement } from "./player.element";
import "./player.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

export const Player: React.FC = () => {
  const audioElem: any = useRef();

  const { currentTrack, isPlaying, volume } = useTypedSelector(
    (state) => state.player
  );
  const { setDuration, setProgress, setCurrentTime } = useActions();

  useEffect(() => {
    if (isPlaying) {
      audioElem?.current?.play();
    } else {
      audioElem?.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const onPlaying = () => {
    const duration = audioElem?.current?.duration;
    const ct = audioElem?.current?.currentTime;
    audioElem.current.volume = volume;
    setCurrentTime(ct);
    setDuration(duration);
    setProgress(ct, duration);
  };

  return (
    <>
      <div className={"player"} hidden={!currentTrack}>
        <audio
          src={currentTrack?.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        />
        <PlayerElement audioElem={audioElem} />
      </div>
    </>
  );
};
