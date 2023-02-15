import React, { useEffect, useRef, useState } from "react";
import { PlayerElement } from "./player.element";
import "./player.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

export const Player: React.FC = () => {
  const audioElem: any = useRef();

  const { currentTrack, isPlaying } = useTypedSelector((state) => state.player);
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
    setCurrentTime(ct);
    setDuration(duration);
    setProgress(ct, duration);
  };

  return (
    <>
      {currentTrack && (
        <div className={"player"}>
          <audio
            src={currentTrack.url}
            ref={audioElem}
            onTimeUpdate={onPlaying}
          />
          <PlayerElement audioElem={audioElem} />
        </div>
      )}
    </>
  );
};
