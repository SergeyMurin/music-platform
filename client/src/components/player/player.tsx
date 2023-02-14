import React, { useEffect, useRef, useState } from "react";
import { PlayerElement } from "./player.element";
import "./player.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

export const Player: React.FC = () => {
  const audioElem: any = useRef();

  const { queue, currentTrack, isPlaying } = useTypedSelector(
    (state) => state.player
  );
  const { setCurrentTrack, setIsPlaying } = useActions();

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

    setCurrentTrack({
      ...currentTrack,
      progress: (ct / duration) * 100,
      length: duration,
    });
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
          <PlayerElement
            tracks={queue}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioElem={audioElem}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        </div>
      )}
    </>
  );
};
